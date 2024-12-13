import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setPokemons } from '../../features/pokemonSlice';
import { getPokemons } from '../../services/api';
import { StyledCardWrapper } from '../../styles';
import { useAuth } from '../contexts/AuthContext';
import FlipCardComponent from '../FlipCardComponent';
import PokemonCsvUpload from './PokemonCsvUpload';

const PokemonComponent = () => {
    const { user } = useAuth();
    const pokemons = useSelector(state => state.pokemons); 
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [activeButton, setActiveButton] = useState('pokemons');

    const fetchPokemons = async () => {
        try {
            const userPokemons = await getPokemons(user?.id);
            console.log(userPokemons);
            dispatch(setPokemons(userPokemons));
        } catch (err) {
            setError('Error al cargar los pokemones');
        }
    };
    
    const handleShowPokemons = () => {
        setActiveButton('pokemons');
        fetchPokemons();
    };

    const handleShowUpload = () => {
        setActiveButton('upload');
    };

    useEffect(() => {
        if (user?.id) {
            fetchPokemons();
        }
    }, [dispatch, user?.id]);

    return (
        <PokemonWrapper>
            <nav className="navbar" style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10}}>
                <form className="form-inline" style={{display: 'flex', gap: '10px'}}>
                    <button
                        className={`btn ${activeButton === 'pokemons' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
                        type="button"
                        onClick={handleShowPokemons}
                    >
                        Listado de Pokemones
                    </button>
                    <button
                        className={`btn ${activeButton === 'upload' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
                        type="button"
                        onClick={handleShowUpload}
                    >
                        Subir Nuevos Pokemones
                    </button>
                </form>
            </nav>

            {activeButton === 'upload' ? <PokemonCsvUpload /> : null}

            {activeButton === 'pokemons' && (
                <StyledCardWrapper>
                    {pokemons.map(pokemon => {
                        const randomId = Math.floor(Math.random() * 151) + 1;
                        return (
                            <FlipCardComponent
                                key={pokemon.id}
                                pokemonName={pokemon.name}
                                imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png`}
                            />
                        );
                    })}
                </StyledCardWrapper>
            )}
        </PokemonWrapper>
    );
};

export const PokemonWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;  
  }

  ::-webkit-scrollbar-track {
    background: transparent;  
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.5);  
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.8);  
  }
`;

export default PokemonComponent;
