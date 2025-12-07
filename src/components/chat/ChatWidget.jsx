import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Image, LogOut } from 'lucide-react';
import io from 'socket.io-client';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [adminId, setAdminId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimerRef = useRef(null);

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    const stored = localStorage.getItem("user");
    // if (!stored) {
    //   window.location.href = "/login";
    //   return;
    // }

    const user = JSON.parse(stored);
    // if (user.role !== "User") {
    //   window.location.href = "/login";
    //   return;
    // }

    setCurrentUser(user);
    findAdmin();
  }, []);

  // Find admin
  const findAdmin = async () => {
    try {
      const res = await fetch(`${API_URL}/chat/find-admin`, { credentials: "include" });
      const json = await res.json();
      if (json.success && json.data) {
        setAdminId(json.data.id);
      }
    } catch (err) {
      console.error("Find admin error:", err);
    }
  };
  
  useEffect(() => {
    if (!adminId || !currentUser) return;

    const newSocket = io(API_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"]
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
      loadMessages();
    });

    newSocket.on("chat:new_message", (data) => {
      setMessages(prev => [...prev, data.message]);
      if (data.message.senderId === adminId) {
        // Nếu chat đang đóng, tăng số lượng tin nhắn chưa đọc
        if (!isOpen) {
          setUnreadCount(prev => prev + 1);
        }
        newSocket.emit("chat:read_messages", { senderId: adminId });
      }
    });

    newSocket.on("chat:user_typing", (data) => {
      if (data.senderId === adminId) {
        setIsTyping(data.isTyping);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [adminId, currentUser]);

  // Load messages
  const loadMessages = async () => {
    if (!adminId) return;

    try {
      const res = await fetch(`${API_URL}/chat/messages/${adminId}?limit=100`, {
        credentials: "include"
      });
      const result = await res.json();
      const msgs = result.data?.messages || result.data || [];
      setMessages(msgs);
      
      // Hiển thị ngay ở cuối sau khi load tin nhắn
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
      }, 50);
    } catch (err) {
      console.error("Load messages error:", err);
    }
  };

  // Scroll to bottom khi có tin nhắn mới - instant, không có animation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [messages, isOpen]);

  // Khi mở chat, reset số lượng tin nhắn chưa đọc và hiển thị ngay cuối
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      // Hiển thị ngay ở cuối, không có scroll animation
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [isOpen]);

  // Send message
  const sendMessage = () => {
    const content = messageInput.trim();

    if (!content || !adminId || !socket?.connected) return;

    socket.emit("chat:send_message", {
      receiverId: adminId,
      content
    }, (ack) => {
      if (ack?.success) {
        setMessages(prev => [...prev, ack.message]);
        setMessageInput("");
      } else {
        alert("Gửi tin nhắn thất bại!");
      }
    });
  };

  // Handle typing
  const handleTyping = (e) => {
    setMessageInput(e.target.value);

    if (!socket?.connected || !adminId) return;

    socket.emit("chat:typing", { receiverId: adminId, isTyping: true });
    clearTimeout(typingTimerRef.current);

    typingTimerRef.current = setTimeout(() => {
      socket.emit("chat:typing", { receiverId: adminId, isTyping: false });
    }, 1000);
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("⚠️ Chỉ được gửi file ảnh!");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  };

  // Send image
  const sendImage = async () => {
    if (!selectedFile) return;

    setPreviewImage(null);

    try {
      const form = new FormData();
      form.append("file", selectedFile);

      const res = await fetch(`${API_URL}/chat/upload-file`, {
        method: "POST",
        credentials: "include",
        body: form
      });

      const json = await res.json();
      console.log("Upload response:", json);

      if (json.success && json.data?.fileUrl) {
        const fullImageUrl = json.data.fileUrl.startsWith('http')
          ? json.data.fileUrl
          : `${API_URL}${json.data.fileUrl}`;

        console.log("Sending image URL:", fullImageUrl);

        socket.emit("chat:send_message", {
          receiverId: adminId,
          content: " ",
          filePath: fullImageUrl
        }, (ack) => {
          console.log("Send message ack:", ack);
          if (ack?.success) {
            setMessages(prev => [...prev, ack.message]);
          } else {
            alert("Gửi ảnh thất bại!");
          }
        });
      } else {
        alert("Upload ảnh thất bại!");
        console.error("Upload failed:", json);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Lỗi upload ảnh!");
    }

    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleLogout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "DELETE",
      credentials: "include"
    });
    localStorage.clear();
    window.location.href = "/views/login.html";
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <>
      <style>{`
        .chat-button {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 50;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
          color: white;
          border: none;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 
            0 8px 24px rgba(255, 107, 53, 0.35),
            0 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 -2px 8px rgba(0, 0, 0, 0.15),
            inset 0 2px 8px rgba(255, 255, 255, 0.25);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateZ(0);
        }

        .chat-button:hover {
          background: linear-gradient(135deg, #e85a2a 0%, #ff7b32 100%);
          transform: translateY(-4px) scale(1.05) translateZ(0);
          box-shadow: 
            0 12px 32px rgba(255, 107, 53, 0.45),
            0 8px 16px rgba(0, 0, 0, 0.2),
            inset 0 -2px 8px rgba(0, 0, 0, 0.15),
            inset 0 2px 8px rgba(255, 255, 255, 0.25);
        }

        .chat-button:active {
          transform: translateY(-2px) scale(1.02) translateZ(0);
          box-shadow: 
            0 6px 16px rgba(255, 107, 53, 0.35),
            0 3px 8px rgba(0, 0, 0, 0.15);
        }

        .unread-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
          color: white;
          border-radius: 50%;
          min-width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          padding: 0 6px;
          box-shadow: 
            0 4px 12px rgba(220, 53, 69, 0.5),
            0 2px 6px rgba(0, 0, 0, 0.2),
            0 0 0 3px white;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .chat-window {
          position: fixed;
          bottom: 110px;
          right: 28px;
          z-index: 40;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.25),
            0 8px 24px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          width: 420px;
          height: 520px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateZ(0);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        .chat-header {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 
            0 4px 12px rgba(255, 107, 53, 0.25),
            inset 0 -1px 2px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .chat-header::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            transparent 100%);
        }

        .chat-header-title h3 {
          margin: 0;
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 0.3px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        .chat-header-title p {
          margin: 6px 0 0 0;
          font-size: 13px;
          opacity: 0.95;
          font-weight: 500;
        }

        .chat-header-actions {
          display: flex;
          gap: 6px;
        }

        .chat-header-btn {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .chat-header-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.05);
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .chat-header-btn:active {
          transform: scale(0.98);
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
          position: relative;
        }

        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .message-wrapper {
          margin-bottom: 16px;
          display: flex;
          animation: messageSlide 0.3s ease;
        }

        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-wrapper.sent {
          justify-content: flex-end;
        }

        .message-wrapper.received {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: 75%;
          padding: 12px 18px;
          border-radius: 20px;
          word-wrap: break-word;
          position: relative;
        }

        .message-bubble.sent {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
          color: white;
          border-bottom-right-radius: 6px;
          box-shadow: 
            0 4px 16px rgba(255, 107, 53, 0.3),
            0 2px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .message-bubble.received {
          background: white;
          color: #2d3436;
          border-bottom-left-radius: 6px;
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        }

        .message-image {
          max-width: 100%;
          border-radius: 14px;
          margin-bottom: 6px;
          cursor: pointer;
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease;
        }

        .message-image:hover {
          transform: scale(1.02);
        }

        .message-text {
          margin: 0;
          font-size: 15px;
          line-height: 1.5;
          font-weight: 400;
        }

        .message-time {
          font-size: 11px;
          margin-top: 6px;
          opacity: 0.7;
          font-weight: 500;
        }

        .typing-indicator {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 16px;
          animation: messageSlide 0.3s ease;
        }

        .typing-bubble {
          background: white;
          padding: 14px 18px;
          border-radius: 20px;
          border-bottom-left-radius: 6px;
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.05),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          display: flex;
          gap: 5px;
        }

        .typing-dot {
          width: 8px;
          height: 8px;
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
          border-radius: 50%;
          animation: typing-bounce 1.4s infinite;
          box-shadow: 0 2px 4px rgba(255, 107, 53, 0.3);
        }

        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing-bounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .chat-input-area {
          padding: 18px 20px;
          background: white;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 
            0 -4px 12px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        .input-wrapper {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .input-icon-btn {
          background: #f8f9fa;
          border: 1px solid rgba(0, 0, 0, 0.08);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #636e72;
          box-shadow: 
            0 2px 6px rgba(0, 0, 0, 0.06),
            inset 0 1px 2px rgba(255, 255, 255, 0.8);
        }

        .input-icon-btn:hover {
          background: #e9ecef;
          transform: scale(1.05);
          box-shadow: 
            0 4px 10px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.8);
          color: #2d3436;
        }

        .input-icon-btn:active {
          transform: scale(0.98);
        }

        .message-input {
          flex: 1;
          padding: 12px 18px;
          border: 2px solid rgba(0, 0, 0, 0.08);
          border-radius: 24px;
          outline: none;
          font-size: 15px;
          font-weight: 400;
          transition: all 0.2s ease;
          background: #f8f9fa;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.04),
            0 1px 2px rgba(255, 255, 255, 0.8);
        }

        .message-input:focus {
          border-color: #ff6b35;
          background: white;
          box-shadow: 
            0 0 0 3px rgba(255, 107, 53, 0.1),
            inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .send-btn {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.2s ease;
          box-shadow: 
            0 4px 12px rgba(255, 107, 53, 0.3),
            0 2px 6px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .send-btn:hover {
          background: linear-gradient(135deg, #e85a2a 0%, #ff7b32 100%);
          transform: scale(1.05);
          box-shadow: 
            0 6px 16px rgba(255, 107, 53, 0.4),
            0 3px 8px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .send-btn:active {
          transform: scale(0.98);
        }

        .preview-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(8px);
          z-index: 60;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .preview-content {
          background: white;
          border-radius: 20px;
          padding: 28px;
          max-width: 520px;
          width: 100%;
          box-shadow: 
            0 24px 64px rgba(0, 0, 0, 0.4),
            0 12px 32px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(0, 0, 0, 0.1);
          animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .preview-title {
          margin: 0 0 20px 0;
          color: #ff6b35;
          font-size: 22px;
          font-weight: 700;
          text-align: center;
          letter-spacing: 0.3px;
        }

        .preview-image {
          width: 100%;
          border-radius: 16px;
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.2),
            0 4px 12px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          margin-bottom: 20px;
        }

        .preview-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .preview-btn {
          padding: 12px 32px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.3px;
        }

        .preview-btn.cancel {
          background: #6c757d;
          color: white;
          box-shadow: 
            0 4px 12px rgba(108, 117, 125, 0.3),
            0 2px 6px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .preview-btn.cancel:hover {
          background: #5a6268;
          transform: translateY(-2px);
          box-shadow: 
            0 6px 16px rgba(108, 117, 125, 0.4),
            0 3px 8px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .preview-btn.send {
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
          color: white;
          box-shadow: 
            0 4px 16px rgba(255, 107, 53, 0.4),
            0 2px 8px rgba(0, 0, 0, 0.1),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .preview-btn.send:hover {
          background: linear-gradient(135deg, #e85a2a 0%, #ff7b32 100%);
          transform: translateY(-2px);
          box-shadow: 
            0 6px 20px rgba(255, 107, 53, 0.5),
            0 3px 10px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.2);
        }

        .preview-btn:active {
          transform: translateY(0);
        }

        .hidden {
          display: none;
        }
      `}</style>

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-button"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
        {!isOpen && unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-title">
              <h3>Chat Support</h3>
              <p>Online now</p>
            </div>
            <div className="chat-header-actions">
              <button
                onClick={handleLogout}
                className="chat-header-btn"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="chat-header-btn"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="messages-container">
            {messages.map((msg, index) => {
              const isSent = msg.senderId === currentUser?.id;
              return (
                <div
                  key={index}
                  className={`message-wrapper ${isSent ? 'sent' : 'received'}`}
                >
                  <div className={`message-bubble ${isSent ? 'sent' : 'received'}`}>
                    {msg.filePath && (
                      <img
                        src={msg.filePath}
                        alt="image"
                        className="message-image"
                        onClick={() => window.open(msg.filePath, '_blank')}
                      />
                    )}
                    {msg.content && !msg.filePath && (
                      <p className="message-text">{msg.content}</p>
                    )}
                    <div className="message-time">
                      {formatTime(msg.sentAt || msg.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="typing-indicator">
                <div className="typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <div className="input-wrapper">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="input-icon-btn"
                title="Gửi ảnh"
              >
                <Image size={20} />
              </button>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />

              <input
                type="text"
                value={messageInput}
                onChange={handleTyping}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Nhập tin nhắn..."
                className="message-input"
              />

              <button
                onClick={sendMessage}
                className="send-btn"
                title="Gửi"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="preview-modal">
          <div className="preview-content">
            <h4 className="preview-title">Preview Image</h4>
            <img
              src={previewImage}
              alt="preview"
              className="preview-image"
            />
            <div className="preview-actions">
              <button
                onClick={() => {
                  setPreviewImage(null);
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="preview-btn cancel"
              >
                Cancel
              </button>
              <button
                onClick={sendImage}
                className="preview-btn send"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;