import { useState } from "react";
import DataTable from "./DataTable";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditModal";
import ProjectForm from "../forms/ProjectForm";

const ProjectsTable = ({ projects = [], onEdit, onDelete }) => {
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const columns = [
    { key: "title", label: "Title" },
    {
      key: "tech",
      label: "Tech",
      render: (row) =>
        Array.isArray(row.tech) ? row.tech.join(", ") : row.tech,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-3">
          <button
            onClick={() => setSelected(row)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => setDeleteId(row._id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={projects} />

      {/* EDIT MODAL */}
      <EditModal
        open={!!selected}
        title="Edit Project"
        onClose={() => setSelected(null)}
      >
        <ProjectForm
          initialData={selected}
          onSubmit={(data) => {
            onEdit(selected._id, data);
            setSelected(null);
          }}
        />
      </EditModal>

      {/* DELETE MODAL */}
      <DeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onDelete={() => {
          onDelete(deleteId);
          setDeleteId(null);
        }}
      />
    </>
  );
};

export default ProjectsTable;
