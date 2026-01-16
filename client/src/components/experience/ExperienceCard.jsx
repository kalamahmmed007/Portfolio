import { Calendar, MapPin, Briefcase, TrendingUp, Award, CheckCircle } from "lucide-react";

const ExperienceCard = ({ experience, index, isLast }) => {
  const {
    title,
    company,
    location,
    startDate,
    endDate,
    current,
    description,
    responsibilities,
    achievements,
    technologies,
    companyLogo
  } = experience;

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const duration = current ? "Present" : formatDate(endDate);
  const period = `${formatDate(startDate)} - ${duration}`;

  return (
    <div
      className="relative mb-8 flex gap-6 last:mb-0"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Timeline Line & Dot */}
      <div className="flex flex-col items-center">
        {/* Timeline Dot with Logo */}
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-blue-500 bg-white shadow-lg">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={company}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <Briefcase className="h-6 w-6 text-blue-600" />
          )}
          
          {/* Current Badge */}
          {current && (
            <div className="absolute -right-2 -top-2 h-4 w-4 animate-pulse rounded-full border-2 border-white bg-green-500"></div>
          )}
        </div>

        {/* Vertical Line */}
        {!isLast && (
          <div className="mt-2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
        )}
      </div>

      {/* Experience Card */}
      <div className="group flex-1">
        <div className="transform overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
          {/* Card Header */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="mb-1 text-2xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                  {title}
                </h3>
                <p className="mb-2 text-lg font-semibold text-blue-600">
                  {company}
                </p>
              </div>
              {current && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Current
                </span>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                {period}
              </div>
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  {location}
                </div>
              )}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {/* Description */}
            {description && (
              <p className="mb-6 leading-relaxed text-gray-700">
                {description}
              </p>
            )}

            {/* Responsibilities */}
            {responsibilities && responsibilities.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-2">
                  {responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Achievements
                </h4>
                <ul className="space-y-2">
                  {achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <TrendingUp className="mt-1 h-4 w-4 flex-shrink-0 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {technologies && technologies.length > 0 && (
              <div>
                <h4 className="mb-3 text-sm font-semibold text-gray-700">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1 text-sm font-medium text-blue-700 transition-colors hover:border-blue-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;