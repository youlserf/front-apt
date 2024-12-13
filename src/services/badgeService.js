import api from './config';

export const getBadges = async () => {
  try {
    const response = await api.get('/badges');
    return response.data;
  } catch (error) {
    console.error('Error fetching badges', error);
    throw error;
  }
};

export const getBadgeById = async (id) => {
  try {
    const response = await api.get(`/badges/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching badge with id ${id}`, error);
    throw error;
  }
};

export const createBadge = async (badgeData) => {
  try {
    const response = await api.post('/badges', badgeData);
    return response.data;
  } catch (error) {
    console.error('Error creating badge', error);
    throw error;
  }
};

export const updateBadge = async (id, badgeData) => {
  try {
    const response = await api.put(`/badges/${id}`, badgeData);
    return response.data;
  } catch (error) {
    console.error(`Error updating badge with id ${id}`, error);
    throw error;
  }
};

export const deleteBadge = async (id) => {
  try {
    await api.delete(`/badges/${id}`);
  } catch (error) {
    console.error(`Error deleting badge with id ${id}`, error);
    throw error;
  }
};
