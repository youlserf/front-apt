import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState: [],
  reducers: {
    setPokemons: (state, action) => {
      return action.payload;
    }
  }
});

export const { setPokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
