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

  const searchPokemon = async (nameOrId) => {
    if (!nameOrId.trim()) {
      dispatch({
        type: SEARCH_ERROR,
        payload: "Nome ou ID do Pokémon é obrigatório.",
      });
      return;
    }

    dispatch({ type: SEARCH_START });

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error("Pokémon não encontrado.");
      }
      const data = await response.json();
      dispatch({ type: SEARCH_SUCCESS, payload: data });
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
