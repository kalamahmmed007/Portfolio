const BlogForm = () => {
  return (
    <form className="space-y-4 rounded-xl bg-white p-6 shadow">
      <h2 className="font-semibold">Blog</h2>

      <input placeholder="Title" className="input" />
      <textarea placeholder="Content" className="input h-40" />

      <button className="btn-primary w-full">Publish</button>
    </form>
  );
};

export default BlogForm;
