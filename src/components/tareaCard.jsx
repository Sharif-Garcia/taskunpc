function TareaCard({ titulo, materia, fecha, completada }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{titulo}</h3>
      <p>
        <strong>Materia:</strong> {materia}
      </p>
      <p>
        <strong>Fecha:</strong> {fecha}
      </p>
      <p>
        <strong>Estado:</strong> {completada ? "✅ Completada" : "⏳ Pendiente"}
      </p>
    </div>
  );
}

export default TareaCard;
