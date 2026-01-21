export const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#ffffff",
  padding: 22,
  color: "#111827",
};

export const headerStyle = { display: "flex", justifyContent: "space-between" };
export const rowStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 14,
  marginTop: 20,
};

export const avatarCircle = {
  width: 44,
  height: 44,
  borderRadius: "50%",
  background: "#e5e7eb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export const avatarImage = { width: "100%", height: "100%", borderRadius: "50%" };

export const menuCard: React.CSSProperties = {
  position: "absolute",
  right: 0,
  top: 54,
  width: 320,
  background: "#ffffff",
  borderRadius: 16,
  padding: 18,
  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
  zIndex: 100,
};

export const menuHeader = { display: "flex", gap: 12 };
export const menuName = { fontWeight: 600 };
export const menuSub = { fontSize: 13 };
export const bigAvatar = {
  width: 46,
  height: 46,
  borderRadius: "50%",
  background: "#e5e7eb",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export const deviceIcon = {
  width: 46,
  height: 46,
  borderRadius: 12,
  background: "#1e88e5",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
export const infoRowBig: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  fontSize: 13,
  marginBottom: 14,
  background: "#f9fafb",
  color: "#111827",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #e5e7eb",
  wordBreak: "break-all",
};

export const primaryBtn = { background: "#1e88e5", color: "#fff", padding: 10 };
export const secondaryBtn = { background: "#1e88e5", color: "#fff", padding: 10 };
export const logoutBtnBig = { background: "#e53935ff", color: "#fff", padding: 10 };
export const timeBox: React.CSSProperties = {
  marginTop: 12,
  marginBottom: 8,
  padding: "6px 10px",
  background: "#ffffff",
  borderRadius: 8,
  display: "inline-flex",
  gap: 12,
  fontSize: 12,
  color: "#111827",
  border: "1px solid #e5e7eb",
};

export const alertRow: React.CSSProperties = {
  display: "flex",
  gap: 14,
  marginTop: 14,
  marginBottom: 10,
  overflowX: "auto",
  paddingBottom: 6,
};

export const alertCardHorizontal = (severity: "CRITICAL" | "WARNING"): React.CSSProperties => ({
  minWidth: 260,
  maxWidth: 300,
  background: "#ffffff",
  color: "#111827",
  borderLeft: `6px solid ${severity === "CRITICAL" ? "#dc2626" : "#f59e0b"}`,
  padding: 14,
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: 10,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
});

export const ackButton = (s: "CRITICAL" | "WARNING") => ({
  background: s === "CRITICAL" ? "#dc2626" : "#f59e0b",
  color: "#fff",
  padding: "6px 12px",
});
export const smallText = { fontSize: 12, opacity: 0.8 };