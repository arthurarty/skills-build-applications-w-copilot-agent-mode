
const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched users:', results);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Users</h1>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="4" className="text-center">No users found.</td></tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <td>{user.id || idx + 1}</td>
                    <td>{user.username || '-'}</td>
                    <td>{user.email || '-'}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-2">View</button>
                      <button className="btn btn-secondary btn-sm">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
