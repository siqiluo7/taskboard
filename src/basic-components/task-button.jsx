export const TaskButton = ({ onClick, label, color }) => {
  return (
    <button
      className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {label}
    </button>
  );
};
