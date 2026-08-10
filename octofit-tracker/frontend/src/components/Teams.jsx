import { useEffect, useState } from 'react';
import { getResourceUrl } from '../utils/api';

export default function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(getResourceUrl('teams'));
        if (!response.ok) {
          throw new Error('Unable to fetch teams');
        }

        const payload = await response.json();
        const collection = Array.isArray(payload) ? payload : payload.results || [];
        setItems(collection);
      } catch (err) {
        setError(err.message || 'Could not load teams');
      }
    }

    load();
  }, []);

  return (
    <section className="container py-4">
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {items.map((team) => (
          <div className="col-md-4" key={team._id || team.id}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">{team.name}</h3>
                <p className="mb-1"><strong>Sport:</strong> {team.sport}</p>
                <p className="mb-0"><strong>Members:</strong> {team.members?.length || team.members || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
