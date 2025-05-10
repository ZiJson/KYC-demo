import { getDaysInMonth, getStartDayOfMonth, isSameDay } from "@/lib/utils";

const DateMode = (props: DateGridProps) => {
  return (
    <>
      <DaysRow />
      <DateGrid {...props} />
    </>
  );
};

export default DateMode;

const DaysRow = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="mb-2 grid grid-cols-7 text-center">
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
};

interface DateGridProps {
  currentDate: Date;
  selectedDate: Date;
  onChange: (timestamp: number) => void;
}

const DateGrid = ({ currentDate, selectedDate, onChange }: DateGridProps) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDayOfMonth(year, month);
  const cells = [];
  for (let i = 0; i < startDay; i++) {
    cells.push(<div key={`empty-${i}`} className="p-2" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const thisDate = new Date(year, month, d);
    const selected = isSameDay(thisDate, selectedDate);
    cells.push(
      <div
        key={d}
        className={`cursor-pointer rounded p-2 text-center font-semibold ${
          selected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        }`}
        onClick={() => onChange(thisDate.getTime())}
      >
        {d}
      </div>,
    );
  }

  return <div className="grid grid-cols-7">{cells}</div>;
};
