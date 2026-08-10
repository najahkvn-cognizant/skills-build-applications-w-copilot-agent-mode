import { useEffect, useState } from 'react';
import { getResourceUrl } from '../utils/api';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(getResourceUrl('activities'));
        if (!response.ok) {
          throw new Error('Unable to fetch activities');
        }

        const payload = await response.json();
        const collection = Array.isArray(payload) ? payload : payload.results || [];
        setItems(collection);
      } catch (err) {
        setError(err.message || 'Could not load activities');
      }
    }

    load();
  }, []);

  return (
    <section className="container py-4">
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {items.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id}>
            <strong>{activity.type}</strong> · {activity.distanceKm ?? 0} km · {activity.durationMinutes ?? 0} min
          </li>
        ))}
      </ul>
    </section>
  );
}
