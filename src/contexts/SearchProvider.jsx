import React, { useReducer } from "react";
import SearchContext from "./SearchContextObject";
import {
  initialState,
  searchReducer,
  SEARCH_ERROR,
  SEARCH_START,
  SEARCH_SUCCESS,
} from "./searchReducer";

export function SearchProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const searchPokemon = async (query) => {
    if (!query.trim()) {
      dispatch({
        type: SEARCH_ERROR,
        payload: "Termo de busca é obrigatório.",
      });
      return;
    }

    dispatch({ type: SEARCH_START });

    try {
      // Verificar se o query é um número (ID)
      const isId = /^\d+$/.test(query.trim());

      if (isId) {
        // Busca por ID diretamente
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${query.trim()}`
        );
        if (!response.ok) {
          throw new Error("Pokémon não encontrado.");
        }
        const data = await response.json();
        dispatch({ type: SEARCH_SUCCESS, payload: [data] });
      } else {
        // Busca por substring no nome
        const listResponse = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        if (!listResponse.ok) {
          throw new Error("Erro ao buscar lista de Pokémon.");
        }
        const listData = await listResponse.json();

        // Filtrar Pokémon que contenham a substring no nome
        const filteredPokemons = listData.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredPokemons.length === 0) {
          throw new Error("Nenhum Pokémon encontrado com essa substring.");
        }

        // Limitar a 10 resultados para performance
        const limitedPokemons = filteredPokemons.slice(0, 10);

        // Buscar detalhes de cada Pokémon
        const pokemonDetails = await Promise.all(
          limitedPokemons.map(async (pokemon) => {
            const detailResponse = await fetch(pokemon.url);
            if (!detailResponse.ok) {
              throw new Error(`Erro ao buscar detalhes de ${pokemon.name}.`);
            }
            return await detailResponse.json();
          })
        );

        dispatch({ type: SEARCH_SUCCESS, payload: pokemonDetails });
      }
    } catch (error) {
      dispatch({ type: SEARCH_ERROR, payload: error.message });
    }
  };

  const clearError = () => {
    dispatch({ type: SEARCH_ERROR, payload: null });
  };

  return (
    <SearchContext.Provider value={{ ...state, searchPokemon, clearError }}>
      {children}
    </SearchContext.Provider>
  );
}
