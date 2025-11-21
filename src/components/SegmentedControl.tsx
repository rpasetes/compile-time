interface SegmentedControlProps {
  options: string[];
  selected: string;
  onChange: (option: string) => void;
}

export function SegmentedControl({ options, selected, onChange }: SegmentedControlProps) {
  return (
    <div className="tab-control">
      {options.map((option) => (
        <button
          key={option}
          className={`tab-button ${selected === option.toLowerCase() ? 'active' : ''}`}
          onClick={() => onChange(option.toLowerCase())}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
