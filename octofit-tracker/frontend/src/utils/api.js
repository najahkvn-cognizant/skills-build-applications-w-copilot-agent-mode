const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function getResourceUrl(resource, page = null) {
  const path = resource === 'users' || resource === 'teams' || resource === 'activities' || resource === 'leaderboard' || resource === 'workouts'
    ? `/api/${resource}/`
    : `/api/${resource}/`;

  const pageParam = page ? `?page=${encodeURIComponent(page)}` : '';
  return `${apiHost}${path}${pageParam}`;
}

export function getApiBaseUrl() {
  return apiHost;
}

export const apiUrl = apiHost;
