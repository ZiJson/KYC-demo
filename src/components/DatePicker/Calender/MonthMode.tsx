interface MonthModeProps {
  currentMonth: number;
  onChange: (timestamp: number) => void;
}

const MonthMode = ({ currentMonth, onChange }: MonthModeProps) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      {monthNames.map((m, index) => (
        <div
          key={m}
          className={`cursor-pointer rounded p-2 text-center ${
            currentMonth === index
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }`}
          onClick={() => onChange(index)}
        >
          {m}
        </div>
      ))}
    </div>
  );
};

export default MonthMode;

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
