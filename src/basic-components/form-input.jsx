export default function FormInput({ label, value, handleChange }) {
  return (
    <>
      <input
        className="w-full p-2 mb-2 border"
        id={label}
        type="text"
        value={value ?? ""}
        placeholder={label}
        onChange={(e) => handleChange(e)}
      />
    </>
  );
}
