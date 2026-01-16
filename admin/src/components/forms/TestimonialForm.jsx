const TestimonialForm = () => {
  return (
    <form className="space-y-4 rounded-xl bg-white p-6 shadow">
      <h2 className="font-semibold">Testimonial</h2>

      <input placeholder="Client Name" className="input" />
      <textarea placeholder="Feedback" className="input h-28" />

      <button className="btn-primary w-full">Save</button>
    </form>
  );
};

export default TestimonialForm;
