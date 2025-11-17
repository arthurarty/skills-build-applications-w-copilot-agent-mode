
const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Teams</h1>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="4" className="text-center">No teams found.</td></tr>
              ) : (
                teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{team.id || idx + 1}</td>
                    <td>{team.name || '-'}</td>
                    <td>{Array.isArray(team.members) ? team.members.join(', ') : '-'}</td>
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

export default Teams;
