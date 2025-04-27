import React, { useState } from "react";
import "./App.css";

// Componente principal de la aplicación
const App = () => {
  // Definir el estado para el calendario y los eventos
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("01:00");
  const [selectedDays, setSelectedDays] = useState([]);

  // Obtener la fecha actual
  const today = new Date();
  const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  // Crear las horas de 00 a 23
  const hours = Array.from({ length: 24 }, (_, i) => `${i < 10 ? "0" : ""}${i}:00`);

  // Función para manejar la selección de días
  const handleDayChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedDays([...selectedDays, value]);
    } else {
      setSelectedDays(selectedDays.filter(day => day !== value));
    }
  };

  // Función para agregar el evento
  const addEvent = (e) => {
    e.preventDefault();

    if (eventName && startTime && endTime && selectedDays.length > 0) {
      // Crear un nuevo evento para cada día seleccionado
      const newEvents = selectedDays.map(day => ({
        name: eventName,
        startTime,
        endTime,
        day,
      }));

      setEvents([...events, ...newEvents]);
      setEventName("");
      setStartTime("00:00");
      setEndTime("01:00");
      setSelectedDays([]);
    }
  };

  // Función para ver si una hora está dentro de un evento
  const isEventAtTime = (hour, event) => {
    const eventStart = parseInt(event.startTime.split(":")[0], 10);
    const eventEnd = parseInt(event.endTime.split(":")[0], 10);
    const hourNum = parseInt(hour.split(":")[0], 10);
    return hourNum >= eventStart && hourNum < eventEnd;
  };

  return (
    <div className="App">
      <h1>Calendario Horario</h1>

      {/* Formulario para agregar eventos */}
      <form onSubmit={addEvent}>
        <div>
          <label>Nombre del Evento:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hora de Inicio:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hora de Fin:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Selecciona los días:</label>
          {weekdays.map((day, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={day}
                onChange={handleDayChange}
                checked={selectedDays.includes(day)}
              />
              {day}
            </div>
          ))}
        </div>

        <button type="submit">Agregar Evento</button>
      </form>

      {/* Calendario */}
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            {weekdays.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, index) => (
            <tr key={index}>
              <td>{hour}</td>
              {weekdays.map((day, idx) => (
                <td key={idx}>
                  {events
                    .filter((event) => event.day === day && isEventAtTime(hour, event))
                    .map((event, eventIdx) => (
                      <div key={eventIdx} style={{ backgroundColor: "#f5a623", marginBottom: "5px", padding: "5px" }}>
                        {event.name}
                      </div>
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
