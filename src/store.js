import { configureStore } from '@reduxjs/toolkit';
import badgeRequestReducer from './features/badgeRequestSlice';
import badgeReducer from './features/badgeSlice';
import pokemonReducer from './features/pokemonSlice';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    badges: badgeReducer,
    user: userReducer,
    pokemons: pokemonReducer,
    badgeRequests: badgeRequestReducer
  }
});

export default store;
