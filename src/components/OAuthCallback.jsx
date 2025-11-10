import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../config/axios';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("processing");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      try {

        // Xử lý lỗi Facebook redirect có thêm #_=_
        if (window.location.hash === "#_=_") {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
    
        const response = await api.get("/me", { withCredentials: true });

        if (!response.data) {
          throw new Error("Không nhận được dữ liệu user từ backend");
        }

        const user = response.data;
        

        // Lưu user vào localStorage để hiển thị UI
        localStorage.setItem("user", JSON.stringify(user));

        // Dispatch event để Header cập nhật trạng thái đăng nhập
        window.dispatchEvent(new Event("auth-changed"));

        setStatus("success");

        // Điều hướng về trang chủ
        setTimeout(() => {
          navigate("/", { replace: true });
          window.location.reload();
        }, 1000);

      } catch (err) {
        console.error("💥 OAuth callback error:", err);
        setStatus("error");
        setErrorMessage(err.message);

        setTimeout(() => {
          navigate("/login", {
            state: { error: err.message || "Đăng nhập thất bại" },
            replace: true,
          });
        }, 2000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
      }}
    >
      {status === "processing" && (
        <>
          <div
            style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #3498db",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p style={{ marginTop: "20px", fontSize: "18px", color: "#555" }}>
            Đang xử lý đăng nhập...
          </p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </>
      )}

      {status === "success" && (
        <>
          <div
            style={{
              fontSize: "60px",
              color: "#28a745",
              marginBottom: "20px",
            }}
          >
            ✓
          </div>
          <p
            style={{
              fontSize: "20px",
              color: "#28a745",
              fontWeight: "bold",
            }}
          >
            Đăng nhập thành công!
          </p>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
            Đang chuyển hướng về trang chủ...
          </p>
        </>
      )}

      {status === "error" && (
        <>
          <div
            style={{
              fontSize: "60px",
              color: "#dc3545",
              marginBottom: "20px",
            }}
          >
            ✕
          </div>
          <p
            style={{
              fontSize: "20px",
              color: "#dc3545",
              fontWeight: "bold",
            }}
          >
            Đăng nhập thất bại!
          </p>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
            {errorMessage || "Có lỗi xảy ra"}
          </p>
          <p style={{ fontSize: "14px", color: "#888", marginTop: "5px" }}>
            Đang chuyển về trang đăng nhập...
          </p>
        </>
      )}
    </div>
  );
};

export default OAuthCallback;
