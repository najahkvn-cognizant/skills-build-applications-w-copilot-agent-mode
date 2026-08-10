import { useEffect, useState } from 'react';
import { getResourceUrl } from '../utils/api';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(getResourceUrl('leaderboard'));
        if (!response.ok) {
          throw new Error('Unable to fetch leaderboard');
        }

        const payload = await response.json();
        const collection = Array.isArray(payload) ? payload : payload.results || [];
        setItems(collection);
      } catch (err) {
        setError(err.message || 'Could not load leaderboard');
      }
    }

    load();
  }, []);

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Points</th>
            <th>Activity Score</th>
          </tr>
        </thead>
        <tbody>
          {items.map((entry) => (
            <tr key={entry._id || entry.id}>
              <td>{entry.rank}</td>
              <td>{entry.points}</td>
              <td>{entry.activityScore || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
