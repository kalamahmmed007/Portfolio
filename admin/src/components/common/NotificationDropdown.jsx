const NotificationDropdown = ({ notifications = [] }) => {
  return (
    <div className="w-64 rounded bg-white p-3 shadow">
      {notifications.length === 0 ? (
        <p className="text-sm text-gray-500">No notifications</p>
      ) : (
        notifications.map((n, i) => (
          <div key={i} className="border-b py-1 text-sm last:border-none">
            {n}
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationDropdown;
