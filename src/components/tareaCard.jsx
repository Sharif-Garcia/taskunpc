function TareaCard({ titulo, materia, fecha, completada }) {
  return (
    <div className={`tarea-card ${completada ? "completada" : "pendiente"}`}>
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
