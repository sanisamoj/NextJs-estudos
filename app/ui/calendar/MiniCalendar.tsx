'use client'
import React, { useState } from "react";

const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Função para gerar os dias do mês
  const generateDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Primeiro e último dia do mês
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Dias antes do primeiro dia do mês (para completar a semana)
    const daysBefore = firstDay.getDay();

    // Todos os dias do mês
    const daysInMonth = Array.from(
      { length: lastDay.getDate() },
      (_, i) => new Date(year, month, i + 1)
    );

    // Dias extras antes e depois
    const daysBeforeMonth = Array.from({ length: daysBefore }, (_, i) => {
      const day = new Date(year, month, 0);
      day.setDate(day.getDate() - (daysBefore - 1 - i));
      return day;
    });

    const totalDays = [...daysBeforeMonth, ...daysInMonth];

    // Completar até 6 semanas no total
    const totalWeeks = Math.ceil(totalDays.length / 7);
    const daysAfterMonth = Array.from(
      { length: totalWeeks * 7 - totalDays.length },
      (_, i) => {
        const day = new Date(lastDay);
        day.setDate(lastDay.getDate() + i + 1);
        return day;
      }
    );

    return [...totalDays, ...daysAfterMonth];
  };

  const days = generateDays(currentDate);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <header className="flex justify-between items-center bg-blue-500 text-white p-4">
        <button
          onClick={goToPreviousMonth}
          className="text-lg font-bold hover:bg-blue-600 px-2 py-1 rounded"
        >
          &lt;
        </button>
        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-lg font-bold hover:bg-blue-600 px-2 py-1 rounded"
        >
          &gt;
        </button>
      </header>

      <div className="grid grid-cols-7 text-center font-semibold border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 p-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(day as any)} 
            className={`py-2 rounded-lg hover:bg-blue-100 transition duration-200 ${
              day.getMonth() !== currentDate.getMonth()
                ? "text-gray-400"
                : day.toDateString() === new Date().toDateString()
                ? "bg-blue-500 text-white"
                : selectedDate && day.toDateString() === selectedDate.toDateString()
                ? "bg-blue-300"
                : ""
            }`}
          >
            {day.getDate()}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="p-4 border-t">
          <h3 className="text-lg font-semibold">Detalhes do Dia</h3>
          <p className="mt-2 text-gray-600">
            Data Selecionada: {selectedDate.toDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default MiniCalendar;