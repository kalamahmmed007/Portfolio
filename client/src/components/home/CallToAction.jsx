import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="bg-indigo-600 px-4 py-16 text-center text-white">
      <h2 className="text-3xl font-bold">
        Let’s build something cool together ✨
      </h2>

      <p className="mt-3 text-indigo-100">
        Have an idea or project? I’m always open to talk.
      </p>

      <Link
        to="/contact"
        className="mt-6 inline-block rounded-lg bg-white px-6 py-2 font-medium text-indigo-600 hover:bg-gray-100"
      >
        Get In Touch
      </Link>
    </section>
  );
};

export default CallToAction;
