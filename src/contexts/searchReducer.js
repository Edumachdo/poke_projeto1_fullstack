export const initialState = {
  loading: false,
  pokemonData: null,
  error: null,
};

export const SEARCH_START = "SEARCH_START";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_ERROR = "SEARCH_ERROR";

export function searchReducer(state, action) {
  switch (action.type) {
    case SEARCH_START:
      return { ...state, loading: true, error: null, pokemonData: null };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        pokemonData: action.payload,
        error: null,
      };
    case SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        pokemonData: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
