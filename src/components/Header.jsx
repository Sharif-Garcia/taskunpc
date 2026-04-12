function Header({ pendientes }) {
  return (
    <header
      style={{
        background: "#282c34",
        color: "white",
        padding: "15px",
        marginBottom: "20px",
      }}
    >
      <h1>Gestor de Tareas</h1>
      <p>Tareas pendientes: {pendientes}</p>
    </header>
  );
}
export default Header;
