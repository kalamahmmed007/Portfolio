import SkillsSection from "../components/skills/SkillsSection";
import { useEffect, useState } from "react";
import { api } from "../services/api";

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get("/skills");
        setSkills(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSkills();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-20">
      <div className="mx-auto max-w-6xl">

        <SkillsSection skills={skills} />
      </div>
    </main>
  );
};

export default Skills;
