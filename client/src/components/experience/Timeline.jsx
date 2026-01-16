import ExperienceCard from "./ExperienceCard";

const Timeline = ({ experiences = [], loading = false }) => {
  // experiences = [] default, jeno undefined na hoy
  if (loading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="h-full w-0.5 bg-gray-300"></div>
              </div>
              <div className="flex-1 rounded-xl bg-white p-6">
                <div className="mb-3 h-6 w-2/3 rounded bg-gray-300"></div>
                <div className="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
                <div className="mb-4 h-4 w-1/3 rounded bg-gray-300"></div>
                <div className="space-y-2">
                  <div className="h-3 rounded bg-gray-300"></div>
                  <div className="h-3 w-5/6 rounded bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (experiences.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <span className="text-4xl">💼</span>
        </div>
        <p className="text-lg text-gray-500">No experience added yet</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {experiences.map((experience, index) => (
        <ExperienceCard
          key={experience._id}
          experience={experience}
          index={index}
          isLast={index === experiences.length - 1}
        />
      ))}
    </div>
  );
};

export default Timeline;
