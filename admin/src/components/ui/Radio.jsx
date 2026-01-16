const Radio = ({ label, ...props }) => (
  <label className="flex items-center gap-2">
    <input type="radio" {...props} className="h-4 w-4" />
    <span>{label}</span>
  </label>
);

export default Radio;
