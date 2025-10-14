import React from "react";
import {
  Box,
  Typography,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
} from "@mui/material";
import { SearchProvider } from "./contexts/SearchProvider";
import { useSearch } from "./contexts/useSearch";
import SearchForm from "./components/SearchForm";
import PokemonCard from "./components/PokemonCard";
import ErrorMessage from "./components/ErrorMessage";
import theme from "./theme";
import "./App.css";

function AppContent() {
  const { loading, pokemonData, error } = useSearch();

  return (
    <Box className="app-container">
      <Paper elevation={6} className="app-paper">
        <Box className="app-header">
          <Typography variant="h3" component="h1" gutterBottom>
            Busca de Pokémon
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Encontre informações sobre Pokémon.
          </Typography>
        </Box>
        <Grid container spacing={4} direction="column" className="app-grid">
          <Grid item xs={12}>
            <SearchForm />
          </Grid>
          <Grid item xs={12}>
            {loading && (
              <Box className="app-loading">
                <Typography variant="h6" color="primary">
                  🔍 Carregando Pokémon...
                </Typography>
              </Box>
            )}
            {error && <ErrorMessage message={error} />}
            {pokemonData.length > 0 && (
              <Grid container spacing={2}>
                {pokemonData.map((pokemon) => (
                  <Grid item xs={12} sm={4} md={4} key={pokemon.id}>
                    <PokemonCard pokemon={pokemon} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Paper>
      <Box component="footer" className="app-footer">
        <Typography variant="body2" className="body2">
          ⚡ Projeto desenvolvido para disciplina de Programação Web Fullstack -
          React SPA com PokéAPI ⚡
        </Typography>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SearchProvider>
        <AppContent />
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
