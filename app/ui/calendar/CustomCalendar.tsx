'use client'
import React, { useEffect, useState } from "react";
import { useDateContext } from "../DateContext";

const CustomCalendar = () => {
    const { selectedDate, setSelectedDate } = useDateContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState("month");

    useEffect(() => {
        setCurrentDate(selectedDate); // Atualiza o currentDate quando selectedDate muda
    }, [selectedDate]);

    // Função para adicionar evento
    const handleAddEvent = () => {
        // Aqui você pode implementar a lógica para adicionar um evento
        alert("Adicionar evento clicado!"); // Exemplo de ação
    };

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

        return daysInMonth;
    };

    // Gerar os dias da semana
    const generateWeekDays = (date: Date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Ajusta para o início da semana (Domingo)
        return Array.from({ length: 7 }, (_, i) => {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            return day;
        });
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const toggleView = () => {
        setView(view === "month" ? "week" : "month");
    };

    const handleDateClick = (day: Date) => {
        setSelectedDate(day);
        setCurrentDate(day); // Atualiza o currentDate no MiniCalendar
    }

    return (
        <div className="flex-1 bg-white shadow-lg rounded-lg overflow-hidden">
            <header className="calendar-header flex justify-between items-center bg-blue-500 text-white p-4">
                <button onClick={goToPreviousMonth} className="text-lg font-bold hover:bg-blue-600 px-2 py-1 rounded">&lt;</button>
                <h2 className="text-xl font-semibold">
                    {view === "month"
                        ? currentDate.toLocaleString("default", { month: "long", year: "numeric" })
                        : currentDate.toLocaleString("default", { month: "long", year: "numeric" }) + " - Semana"}
                </h2>
                <button onClick={goToNextMonth} className="text-lg font-bold hover:bg-blue-600 px-2 py-1 rounded">&gt;</button>
            </header>

            <div className="flex justify-between items-center p-4">
                <button></button>
            </div>

            <div className="flex justify-between p-4">
                <button onClick={toggleView} className="bg-blue-500 text-white px-4 py-2 rounded">
                    {view === "month" ? "Ver Semanal" : "Ver Mensal"}
                </button>
                <button
                    onClick={handleAddEvent}
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    title="Adicionar evento">
                    Adicionar evento
                    <span className="text-lg p-1">+</span>
                </button>
            </div>

            <div className="overflow-auto" style={{ height: '70vh' }}>
                {view === "week" && (
                    <div className="grid grid-cols-8 text-center font-semibold border-b">
                        {generateWeekDays(currentDate).map((day) => (
                            <div key={day.toString()} className="py-2 border-b">
                                {day.toLocaleDateString("default", { weekday: "short" })}
                            </div>
                        ))}
                    </div>
                )}

                <div className={`grid ${view === "week" ? "grid-cols-8" : "grid-cols-7"} gap-1 p-2`}>
                    {view === "week" ? (
                        Array.from({ length: 24 }, (_, hour) => (
                            <React.Fragment key={hour}>
                                <div className="border h-16 p-2 text-center font-bold">
                                    {hour.toString().padStart(2, '0')}:00
                                </div>
                                {generateWeekDays(currentDate).map((day) => (
                                    <div key={day.toString()} className="border h-16 p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-200">
                                        <div className="mt-2 text-sm text-gray-600">Clique para adicionar</div>
                                    </div>
                                ))}
                            </React.Fragment>
                        ))
                    ) : (
                        generateDays(currentDate).map((day, index) => (
                            <div
                                key={index}
                                onClick={() => handleDateClick(day)}
                                className={`border h-32 p-2 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-200`}>
                                <div className="font-bold">{day.getDate()}</div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomCalendar;