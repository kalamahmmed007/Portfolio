import { useNavigate } from "react-router-dom";
import ProjectForm from "../../components/forms/ProjectForm";
import { api } from "../../services/api";

const AddProject = () => {
  const navigate = useNavigate();

  const handleSuccess = async () => {
    // optional: fetch latest projects or show toast
    navigate("/projects"); // redirect back to Projects List
  };

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <ProjectForm onSuccess={handleSuccess} />
    </div>
  );
};

export default AddProject;
