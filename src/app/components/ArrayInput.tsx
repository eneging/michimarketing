"use client";

import React, { useState } from "react";

interface ArrayInputProps {
  name: string;
  label: string;
  value: string[];
  onChange: (name: string, value: string[]) => void;
  placeholder?: string;
}

export default function ArrayInput({ name, label, value, onChange, placeholder }: ArrayInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Evita el comportamiento predeterminado del formulario al presionar Enter.
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue !== "") {
        onChange(name, [...value, trimmedValue]);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      // Permite eliminar la última etiqueta con Backspace si el input está vacío.
      e.preventDefault();
      const newValue = [...value];
      newValue.pop();
      onChange(name, newValue);
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newValue = value.filter((tag) => tag !== tagToRemove);
    onChange(name, newValue);
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-400 mb-1">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 p-2 bg-gray-800 rounded-lg border border-gray-700 min-h-[40px] items-center">
        {value.map((tag, index) => (
          <span key={index} className="flex items-center bg-emerald-700 text-white text-xs px-2 py-1 rounded-full">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1 text-xs text-white/70 hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
        <input
          id={name}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || `Escribe y presiona Enter para agregar`}
          className="flex-grow bg-transparent text-white focus:outline-none placeholder-gray-500"
        />
      </div>
    </div>
  );
}