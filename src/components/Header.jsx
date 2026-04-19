function Header({ pendientes }) {
  return (
    <header
      style={{
        background: "var(--accent)",
        color: "white",
        padding: "15px",
        marginBottom: "20px",
        borderRadius: "15px",
      }}
    >
      <h1>Gestor de Tareas</h1>
      <p>Tareas pendientes: {pendientes}</p>
    </header>
  );
}

export default Header;
