import api from './config';

export const getBadges = async () => {
  const response = await api.get('/badges');
  return response.data;
};

export const getPokemons = async (userId) => {
  const response = await api.get(`/pokemons/user/${userId}`);
  return response.data;
};

export const getUserBadges = async (userId) => {
  const response = await api.get(`/users/badges/${userId}`);
  return response.data;
};

export const uploadPokemonCsv = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/pokemons/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const createBadgeRequest = async (userId, badgeId) => {
  const response = await api.post('/badge-requests/create', { userId, badgeId });
  return response.data;
};

export const getBadgeRequests = async () => {
  const response = await api.get('/badge-requests');
  return response.data;
};

export const updateBadgeRequestStatus = async (requestId, status) => {
  const response = await api.post(`/badge-requests/update/${requestId}`, { status });
  return response.data;
};

export const getUserBadgesDetail = async (userId) => {
  const response = await api.get(`/badge-requests/user/${userId}/badges`);
  return response.data;
};

export const getAvailableBadges = async () => {
  const response = await api.get('/badges');
  return response.data;
};

export const getBadgeRequestsStatus = async (status = '') => {
  const response = await api.get(`/badge-requests?status=${status}`);
  return response.data;
};
