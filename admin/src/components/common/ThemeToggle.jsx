const ThemeToggle = ({ theme, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="rounded border px-3 py-1 text-sm"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
