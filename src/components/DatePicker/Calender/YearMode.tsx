const PAGE_SIZE = 12;

interface YearModeProps {
  currentYear: number;
  seletedYear: number;
  onChange: (yeat: number) => void;
}

const YearMode = ({ currentYear, seletedYear, onChange }: YearModeProps) => {
  const startYear = currentYear - Math.floor(PAGE_SIZE / 2);
  const years = Array.from({ length: PAGE_SIZE }, (_, i) => i + startYear);
  const thisYear = new Date().getFullYear();
  return (
    <div className="grid grid-cols-3 gap-1">
      {years.map(
        (y) =>
          y <= thisYear && (
            <div
              key={y}
              className={`cursor-pointer rounded p-2 text-center ${
                seletedYear === y
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
              onClick={() => onChange(y)}
            >
              {y}
            </div>
          ),
      )}
    </div>
  );
};

export default YearMode;
