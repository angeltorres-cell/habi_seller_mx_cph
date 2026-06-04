export default function TopBar() {
  return (
    <div
      style={{
        background: "var(--purple)",
        padding: "10px 24px",
        textAlign: "center",
        color: "#fff",
        fontSize: "13px",
        fontWeight: 600,
      }}
    >
      🤝 Miles de familias ya lo lograron —{" "}
      <span style={{ fontWeight: 800 }}>tú no tienes por qué hacerlo solo</span>
    </div>
  );
}
