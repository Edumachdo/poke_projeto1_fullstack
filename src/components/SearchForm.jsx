import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Paper } from "@mui/material";
import { useSearch } from "../contexts/useSearch";

function SearchForm() {
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const { searchPokemon, error, clearError } = useSearch();

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [input, error, clearError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setInputError("Por favor, insira o nome ou ID do Pokémon.");
      return;
    }
    setInputError("");
    searchPokemon(input);
  };

  return (
    <Paper className="search-form-paper">
      <Box component="form" onSubmit={handleSubmit} className="search-form-box">
        <TextField
          label="Nome ou ID do Pokémon"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={!!inputError}
          helperText={inputError}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Buscar
        </Button>
      </Box>
    </Paper>
  );
}

export default SearchForm;
