import React, { useState } from 'react';
import './App.css';

function App() {
  const [events, setEvents] = useState([]); // Eventos guardados
  const [eventName, setEventName] = useState(""); // Nombre del evento
  const [eventStart, setEventStart] = useState(""); // Hora de inicio
  const [eventEnd, setEventEnd] = useState(""); // Hora de fin
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento seleccionado para editar

  const handleAddEvent = () => {
    if (!eventName || !eventStart || !eventEnd) return;
    
    const newEvent = {
      id: Date.now(),
      name: eventName,
      start: eventStart,
      end: eventEnd,
      color: 'blue', // color por defecto
    };
    
    setEvents([...events, newEvent]);
    setEventName('');
    setEventStart('');
    setEventEnd('');
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEditEvent = (id, color) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, color } : event
    ));
  };

  const handleClickEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="App">
      <h1>Calendario de Eventos</h1>
      <div className="form-container">
        <input
          type="text"
          placeholder="Nombre del evento"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="time"
          value={eventStart}
          onChange={(e) => setEventStart(e.target.value)}
        />
        <input
          type="time"
          value={eventEnd}
          onChange={(e) => setEventEnd(e.target.value)}
        />
        <button onClick={handleAddEvent}>Agregar Evento</button>
      </div>
      <div className="events-list">
        {events.map(event => (
          <div 
            key={event.id} 
            className="event" 
            style={{ backgroundColor: event.color }} 
            onClick={() => handleClickEvent(event)}
          >
            {event.name} ({event.start} - {event.end})
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="event-actions">
          <h3>Opciones para: {selectedEvent.name}</h3>
          <div>
            <label>Color: </label>
            <input 
              type="color" 
              value={selectedEvent.color} 
              onChange={(e) => handleEditEvent(selectedEvent.id, e.target.value)} 
            />
          </div>
          <button onClick={() => handleDeleteEvent(selectedEvent.id)}>Eliminar Evento</button>
        </div>
      )}
    </div>
  );
}

export default App;
