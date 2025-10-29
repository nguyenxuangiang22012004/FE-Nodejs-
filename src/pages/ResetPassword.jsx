import React, { useState, useEffect } from "react";
import { resetPassword } from "../services/AuthService";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const SUCCESS_REDIRECT_URL = import.meta.env.VITE_FRONTEND_URL + "/login";
  
  // ✅ Regex kiểm tra mật khẩu mạnh
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    setMessage("");
    setMessageType("");

    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      setMessage("Vui lòng nhập mật khẩu mới!");
      setMessageType("error");
      return;
    }

    if (!validatePassword(trimmedPassword)) {
      setMessage(
        "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
      );
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      const data = await resetPassword(trimmedPassword);
      setMessage(data.message || "Đặt lại mật khẩu thành công!");
      setMessageType("success");
      
      setTimeout(() => {
        window.location.href = SUCCESS_REDIRECT_URL;
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Không thể đặt lại mật khẩu, thử lại sau!");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "80px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 200px)",
      }}
    >
      <div style={{ width: "100%", maxWidth: "600px" }}>
        <div
          style={{
            width: "100%",
            background: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            padding: "50px 40px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "40px",
              letterSpacing: "0.8px",
              color: "#222",
            }}
          >
            RESET PASSWORD
          </h2>

          {/* ✅ Hiển thị thông báo */}
          {message && (
            <div
              style={{
                marginBottom: "20px",
                color: messageType === "success" ? "green" : "red",
                background: messageType === "success" ? "#eaffea" : "#ffeaea",
                padding: "10px 15px",
                borderRadius: "6px",
                fontSize: "15px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}

          <label
            style={{
              display: "block",
              fontWeight: "600",
              fontSize: "16px",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            NEW PASSWORD *
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "16px",
              marginBottom: "25px",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#ff4d00";
              e.target.style.boxShadow = "0 0 8px rgba(255,77,0,0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
              e.target.style.boxShadow = "none";
            }}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              display: "block",
              width: "100%",
              background: loading ? "#999" : "#ff4d00",
              border: "none",
              color: "white",
              padding: "14px",
              fontSize: "16px",
              borderRadius: "6px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = "#fff";
                e.target.style.border = "2px solid #ff4d00";
                e.target.style.color = "#ff4d00";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = "#ff4d00";
                e.target.style.border = "none";
                e.target.style.color = "white";
              }
            }}
          >
            {loading ? "Processing..." : "SUBMIT"}
          </button>

          <a
            href="/login"
            style={{
              display: "block",
              marginTop: "25px",
              fontSize: "15px",
              textAlign: "center",
              color: "#111",
              fontWeight: "500",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#ff4d00")}
            onMouseLeave={(e) => (e.target.style.color = "#111")}
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
