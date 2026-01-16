
import { useState, useEffect } from "react";
import Timeline from "../components/experience/Timeline";
import { 
  Briefcase, Download, Calendar, TrendingUp, 
  Award, Target, Loader 
} from "lucide-react";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/experience");
        
        if (!response.ok) throw new Error("Failed to fetch experience");
        
        const data = await response.json();
        
        // Assuming API returns { experiences: [], stats: {} }
        setExperiences(data.experiences || data);
        setStats(data.stats);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching experience:", err);
        
        // Demo data if API fails
        setExperiences([
          {
            _id: "1",
            title: "Senior Full Stack Developer",
            company: "Tech Corp International",
            location: "San Francisco, CA",
            startDate: "2021-06-01",
            endDate: null,
            current: true,
            companyLogo: "https://via.placeholder.com/100",
            description: "Leading the development of enterprise-level web applications and mentoring junior developers.",
            responsibilities: [
              "Architecting and developing scalable web applications using React and Node.js",
              "Leading a team of 5 developers in agile sprint planning and execution",
              "Conducting code reviews and ensuring best practices across the team",
              "Implementing CI/CD pipelines and automated testing strategies"
            ],
            achievements: [
              "Improved application performance by 40% through optimization",
              "Successfully launched 3 major product features ahead of schedule",
              "Reduced deployment time by 60% with automated pipelines"
            ],
            technologies: ["React", "Node.js", "TypeScript", "AWS", "Docker", "MongoDB"]
          },
          {
            _id: "2",
            title: "Full Stack Developer",
            company: "Digital Solutions Ltd",
            location: "New York, NY",
            startDate: "2019-03-01",
            endDate: "2021-05-31",
            current: false,
            companyLogo: "https://via.placeholder.com/100",
            description: "Developed and maintained multiple client-facing web applications.",
            responsibilities: [
              "Built responsive web applications using modern JavaScript frameworks",
              "Collaborated with designers to implement pixel-perfect UI components",
              "Integrated RESTful APIs and third-party services",
              "Maintained and optimized existing codebases"
            ],
            achievements: [
              "Delivered 15+ projects with 98% client satisfaction rate",
              "Implemented real-time features that increased user engagement by 35%"
            ],
            technologies: ["React", "Vue.js", "Express", "PostgreSQL", "Redis"]
          },
          {
            _id: "3",
            title: "Junior Web Developer",
            company: "StartUp Innovations",
            location: "Remote",
            startDate: "2017-08-01",
            endDate: "2019-02-28",
            current: false,
            description: "Started my professional journey building modern web applications.",
            responsibilities: [
              "Developed frontend features using HTML, CSS, and JavaScript",
              "Fixed bugs and maintained legacy code",
              "Participated in daily standups and sprint planning",
              "Learned best practices from senior developers"
            ],
            achievements: [
              "Completed 50+ feature tickets in first year",
              "Received 'Rising Star' award for outstanding performance"
            ],
            technologies: ["JavaScript", "jQuery", "Bootstrap", "PHP", "MySQL"]
          }
        ]);

        setStats({
          totalYears: "5+",
          companies: 3,
          projects: 50,
          technologies: 20
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  // Calculate total experience
  const calculateTotalExperience = () => {
    if (!experiences.length) return "0 years";
    
    const firstJob = experiences[experiences.length - 1];
    const startDate = new Date(firstJob.startDate);
    const today = new Date();
    const years = Math.floor((today - startDate) / (365 * 24 * 60 * 60 * 1000));
    const months = Math.floor(((today - startDate) % (365 * 24 * 60 * 60 * 1000)) / (30 * 24 * 60 * 60 * 1000));
    
    return `${years} years ${months} months`;
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="mb-4 text-lg text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <Briefcase className="h-4 w-4" />
            Professional Journey
          </div>
          
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Work Experience
          </h1>
          <div className="mx-auto mb-6 h-1 w-24 bg-blue-600"></div>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
            A timeline of my professional journey, showcasing the roles, responsibilities, and achievements throughout my career
          </p>

          {/* Download Resume */}
          <button className="inline-flex transform items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
            <Download className="h-5 w-5" />
            Download Resume
          </button>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="rounded-xl bg-white p-6 text-center shadow-md transition-shadow hover:shadow-xl">
                <Calendar className="mx-auto mb-3 h-8 w-8 text-blue-600" />
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {calculateTotalExperience()}
                </div>
                <div className="text-sm text-gray-600">Total Experience</div>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-md transition-shadow hover:shadow-xl">
                <Briefcase className="mx-auto mb-3 h-8 w-8 text-green-600" />
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {stats.companies || experiences.length}
                </div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-md transition-shadow hover:shadow-xl">
                <Target className="mx-auto mb-3 h-8 w-8 text-purple-600" />
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {stats.projects || "50+"}
                </div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-md transition-shadow hover:shadow-xl">
                <Award className="mx-auto mb-3 h-8 w-8 text-yellow-600" />
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {stats.technologies || "20+"}
                </div>
                <div className="text-sm text-gray-600">Technologies</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="h-12 w-12 animate-spin text-blue-600" />
            </div>
          ) : (
            <Timeline experiences={experiences} loading={false} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Experience;