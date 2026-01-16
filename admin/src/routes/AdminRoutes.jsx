// src/routes/AdminRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Dashboard from "../pages/Dashboard";

// Projects
import ProjectsList from "../pages/Projects/ProjectsList";
import AddProject from "../pages/Projects/AddProject";
import EditProject from "../pages/Projects/EditProject";

// Skills
import SkillsList from "../pages/Skills/SkillsList";
import ManageSkills from "../pages/Skills/ManageSkills";

// Experience
import ExperienceList from "../pages/Experience/ExperienceList";
import ManageExperience from "../pages/Experience/ManageExperience";

// Education
import EducationList from "../pages/Education/EducationList";
import ManageEducation from "../pages/Education/ManageEducation";

// Testimonials
import TestimonialsList from "../pages/Testimonials/TestimonialsList";
import ManageTestimonials from "../pages/Testimonials/ManageTestimonials";

// Blog
import BlogList from "../pages/Blog/BlogList";
import AddBlog from "../pages/Blog/AddBlog";
import EditBlog from "../pages/Blog/EditBlog";

// Messages
import MessagesList from "../pages/Messages/MessagesList";
import MessageDetail from "../pages/Messages/MessageDetail";

// Settings
import Profile from "../pages/Settings/Profile";
import Security from "../pages/Settings/Security";
import SiteSettings from "../pages/Settings/SiteSettings";
import SocialMedia from "../pages/Settings/SocialMedia";

// Other
import Analytics from "../pages/Analytics";
import FileManager from "../pages/FileManager";
import NotFound from "../pages/NotFound";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Wrap all admin pages inside DashboardLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Projects */}
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/add" element={<AddProject />} />
        <Route path="projects/edit/:id" element={<EditProject />} />

        {/* Skills */}
        <Route path="skills" element={<SkillsList />} />
        <Route path="skills/manage" element={<ManageSkills />} />

        {/* Experience */}
        <Route path="experience" element={<ExperienceList />} />
        <Route path="experience/manage" element={<ManageExperience />} />

        {/* Education */}
        <Route path="education" element={<EducationList />} />
        <Route path="education/manage" element={<ManageEducation />} />

        {/* Testimonials */}
        <Route path="testimonials" element={<TestimonialsList />} />
        <Route path="testimonials/manage" element={<ManageTestimonials />} />

        {/* Blog */}
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/add" element={<AddBlog />} />
        <Route path="blog/edit/:id" element={<EditBlog />} />

        {/* Messages */}
        <Route path="messages" element={<MessagesList />} />
        <Route path="messages/:id" element={<MessageDetail />} />

        {/* Settings */}
        <Route path="settings/profile" element={<Profile />} />
        <Route path="settings/security" element={<Security />} />
        <Route path="settings/site" element={<SiteSettings />} />
        <Route path="settings/social" element={<SocialMedia />} />

        {/* Analytics & File Manager */}
        <Route path="analytics" element={<Analytics />} />
        <Route path="files" element={<FileManager />} />

        {/* Catch-all 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Redirect root / to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
