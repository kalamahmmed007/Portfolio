import DataTable from "./DataTable";

const MessagesTable = ({ messages = [], onView }) => {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "message",
      label: "Message",
      render: (row) => row.message.slice(0, 40) + "...",
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <button
          onClick={() => onView(row)}
          className="text-black underline"
        >
          View
        </button>
      ),
    },
  ];

  return <DataTable columns={columns} data={messages} />;
};

export default MessagesTable;
