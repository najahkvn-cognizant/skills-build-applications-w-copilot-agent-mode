import { useEffect, useState } from 'react';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
        const apiBaseUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';

        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
          throw new Error('Unable to fetch workouts');
        }

        const payload = await response.json();
        const collection = Array.isArray(payload) ? payload : payload.results || [];
        setItems(collection);
      } catch (err) {
        setError(err.message || 'Could not load workouts');
      }
    }

    load();
  }, []);

  return (
    <section className="container py-4">
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {items.map((workout) => (
          <div className="col-md-4" key={workout._id || workout.id}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">{workout.title}</h3>
                <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="mb-0"><strong>Duration:</strong> {workout.durationMinutes} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
