import { useState } from "react";

interface CalendarProps {
  surveyCreateDate: string;
}

const Calendar: React.FC<CalendarProps> = ({ surveyCreateDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>("12:30");

  const surveyDateTime = new Date(surveyCreateDate);

  const handleDateClick = (day: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(day);
    newDate.setHours(0, 0, 0, 0);

    if (newDate >= surveyDateTime) {
      setSelectedDate(newDate);
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(Number(event.target.value));
    newDate.setHours(0, 0, 0, 0);

    if (newDate >= surveyDateTime) {
      setSelectedDate(newDate);
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = event.target.value;
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(
      parseInt(newTime.split(":")[0], 10),
      parseInt(newTime.split(":")[1], 10)
    );

    if (selectedDateTime >= surveyDateTime) {
      setSelectedTime(newTime);
    }
  };

  const handleDateTimeConfirm = () => {
    setShowCalendar(false);
  };

  const renderDays = () => {
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-gray-400"> </div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const newDate = new Date(selectedDate);
      newDate.setDate(day);
      newDate.setHours(0, 0, 0, 0);

      const isDisabled = newDate < surveyDateTime;
      days.push(
        <div
          key={day}
          className={`p-2 text-center cursor-pointer rounded-md transition ${
            isDisabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
          } ${selectedDate.getDate() === day && !isDisabled ? "bg-blue-500 text-white" : ""}`}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg border border-gray-300 relative">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="flex items-center gap-2 w-full p-3 border rounded-lg text-gray-600 font-medium shadow-sm hover:shadow-md transition"
      >
        <span className="w-5 h-5 text-gray-500">📅</span>
        {selectedDate.toDateString()} {selectedTime}
      </button>
      {showCalendar && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white border rounded-lg shadow-lg w-full z-10">
          <div className="flex justify-between mb-2">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              ◀
            </button>
            <span className="font-bold">{selectedDate.toLocaleString("default", { month: "long" })}</span>
            <select value={selectedDate.getFullYear()} onChange={handleYearChange} className="border px-2 py-1 rounded">
              {Array.from({ length: 100 }, (_, i) => (
                <option key={i} value={selectedDate.getFullYear() - 50 + i}>
                  {selectedDate.getFullYear() - 50 + i}
                </option>
              ))}
            </select>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              ▶
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-600">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="text-lg">{d}</div>
            ))}
            {renderDays()}
          </div>
          <div className="mt-4">
            <label className="block mb-1 font-semibold text-gray-700">Select Time:</label>
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
              className="w-full p-3 border rounded-lg shadow-sm hover:shadow-md transition text-gray-700 font-medium"
            />
          </div>
          <button
            onClick={handleDateTimeConfirm}
            className="mt-4 w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Confirm Date & Time
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;




