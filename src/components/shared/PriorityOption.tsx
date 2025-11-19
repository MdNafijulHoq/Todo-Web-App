"use client";

const PriorityOption = ({
  value,
  label,
  color,
  priority,
  onChange,
}: {
  value: string;
  label: string;
  color: string;
  priority: string;
  onChange: (value: string) => void;
}) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${color}`}></div>
        <span>{label}</span>
      </div>
      <input
        type="checkbox"
        name="priority"
        value={value}
        checked={priority === value}
        onChange={(e) => onChange(e.target.value)}
        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
      />
    </label>
  );
};

export default PriorityOption;
