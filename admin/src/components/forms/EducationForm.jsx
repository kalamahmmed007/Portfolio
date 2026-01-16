const EducationForm = ({ onSubmit }) => {
  return (
    <form className="space-y-4 rounded-xl bg-white p-6 shadow">
      <h2 className="font-semibold">Education</h2>

      <input placeholder="Institute" className="input" />
      <input placeholder="Degree" className="input" />
      <input placeholder="Year" className="input" />

      <button className="btn-primary w-full">Save Education</button>
    </form>
  );
};

export default EducationForm;
