import React from "react";

export function AuthShell({ headline, subhead, children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0f172a", color: "#f8fafc", padding: "2rem" }}>
      <div style={{ maxWidth: "440px", width: "100%", backgroundColor: "#1e293b", padding: "2.5rem", borderRadius: "12px", border: "1px solid #334155", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>{headline}</h2>
          {subhead && <p style={{ color: "#94a3b8", fontSize: "0.875rem" }}>{subhead}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

export function AuthField({ label, type = "text", value, onChange, placeholder, extra }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "500", color: "#cbd5e1" }}>{label}</label>
        {extra}
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "0.65rem 0.85rem",
          backgroundColor: "#0f172a",
          border: "1px solid #475569",
          borderRadius: "6px",
          color: "#f8fafc",
          fontSize: "0.9rem",
          outline: "none"
        }}
      />
    </div>
  );
}

export function AuthPrimaryButton({ children, disabled, type = "button" }) {
  return (
    <button
      type={type}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "0.75rem",
        backgroundColor: "#6366f1",
        color: "#ffffff",
        fontWeight: "600",
        borderRadius: "6px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        fontSize: "0.95rem"
      }}
    >
      {children}
    </button>
  );
}

export function AuthErrorBanner({ children }) {
  if (!children) return null;
  return (
    <div style={{ padding: "0.65rem", backgroundColor: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", borderRadius: "6px", color: "#fca5a5", fontSize: "0.85rem", marginBottom: "1rem" }}>
      {children}
    </div>
  );
}
