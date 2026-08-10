import { useEffect, useState } from 'react';
import { apiUrl, getResourceUrl } from '../utils/api';

export default function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(getResourceUrl('users'));
        if (!response.ok) {
          throw new Error('Unable to fetch users');
        }

        const payload = await response.json();
        const collection = Array.isArray(payload) ? payload : payload.results || [];
        setItems(collection);
      } catch (err) {
        setError(err.message || 'Could not load users');
      }
    }

    load();
  }, []);

  return (
    <section className="container py-4">
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {items.map((user) => (
            <tr key={user._id || user.id || user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.profile?.fitnessGoal || 'General fitness'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
