import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ComponentWrapper from '../components/ComponentWrapper';
import { useAuth } from '../components/contexts/AuthContext';
import PokemonComponent from '../components/pokemon';
import { setBadges } from '../features/badgeSlice';
import { setPokemons } from '../features/pokemonSlice';
import { getPokemons, getUserBadges } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const userBadges = await getUserBadges(user?.id);
        dispatch(setBadges(userBadges));
      } catch (err) {
        setError('Error al cargar las medallas');
      } finally {
        setLoading(false);
      }
    };
    fetchBadges();
  }, [dispatch, user?.id]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const userPokemons = await getPokemons(user?.id);
        dispatch(setPokemons(userPokemons));
      } catch (err) {
        setError('Error al cargar los pokemones');
      }
    };
    fetchPokemons();
  }, [dispatch, user?.id]);

  return (
    <ComponentWrapper>
      <PokemonComponent/>
    </ComponentWrapper>
  );
};

export default Dashboard;
