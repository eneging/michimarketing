"use client";

import { useState, useEffect } from "react";

interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

export default function GestorTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tareas");
    if (saved) setTareas(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = () => {
    if (!input) return;
    setTareas([...tareas, { id: Date.now(), texto: input, completada: false }]);
    setInput("");
  };

  const toggleCompletada = (id: number) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  const eliminarTarea = (id: number) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  return (
    <div className=" p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-xl font-bold mb-4">Gestor de Tareas</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nueva tarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button onClick={agregarTarea} className="bg-blue-500 text-white px-4 rounded">Agregar</button>
      </div>
      <ul>
        {tareas.map(t => (
          <li key={t.id} className="flex justify-between items-center mb-2">
            <span
              className={`${t.completada ? "line-through text-gray-400" : ""}`}
              onClick={() => toggleCompletada(t.id)}
            >
              {t.texto}
            </span>
            <button onClick={() => eliminarTarea(t.id)} className="text-red-500">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
