import React, { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Stack,
  Grid,
  LinearProgress,
  Divider,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import PokemonWeaknesses from "./PokemonWeaknesses";
import "./PokemonCard.css";

function PokemonCard({ pokemon }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!pokemon) return null;

  const { name, sprites, types, height, weight, abilities, stats } = pokemon;
  const imageUrl = sprites?.front_default;
  const typeNames = types?.map((type) => type.type.name) || [];
  const abilityNames = abilities?.map((ability) => ability.ability.name) || [];

  // Calcular fraquezas únicas
  const typeWeaknesses = {
    normal: ["fighting"],
    fire: ["water", "ground", "rock"],
    water: ["grass", "electric"],
    grass: ["fire", "ice", "poison", "flying", "bug"],
    electric: ["ground"],
    ice: ["fire", "fighting", "rock", "steel"],
    fighting: ["flying", "psychic", "fairy"],
    poison: ["ground", "psychic"],
    ground: ["water", "grass", "ice"],
    flying: ["electric", "ice", "rock"],
    psychic: ["bug", "ghost", "dark"],
    bug: ["fire", "flying", "rock"],
    rock: ["water", "grass", "fighting", "ground", "steel"],
    ghost: ["ghost", "dark"],
    dragon: ["ice", "dragon", "fairy"],
    dark: ["fighting", "bug", "fairy"],
    steel: ["fire", "fighting", "ground"],
    fairy: ["poison", "steel"],
  };

  const weaknesses = [
    ...new Set(typeNames.flatMap((type) => typeWeaknesses[type] || [])),
  ];

  const cryUrl = `https://play.pokemonshowdown.com/audio/cries/${name.toLowerCase()}.mp3`;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="pokemon-card">
      <CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt={name}
        className="pokemon-image"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          className="pokemon-name"
        >
          {name}
        </Typography>
        <Stack direction="row" spacing={1} className="pokemon-types">
          {typeNames.map((type) => (
            <Chip
              key={type}
              label={type}
              color="primary"
              variant="outlined"
              className="pokemon-type-chip"
            />
          ))}
        </Stack>
        <Grid container spacing={2} className="pokemon-details">
          <Grid item xs={6} className="pokemon-detail-left">
            <Typography
              variant="body1"
              color="text.secondary"
              className="pokemon-detail-label"
            >
              Altura:
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="pokemon-detail-value"
            >
              {height / 10} m
            </Typography>
          </Grid>
          <Grid item xs={6} className="pokemon-detail-right">
            <Typography
              variant="body1"
              color="text.secondary"
              className="pokemon-detail-label"
            >
              Peso:
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="pokemon-detail-value"
            >
              {weight / 10} kg
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={2} className="pokemon-section">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="pokemon-section-title">
              Habilidades:
            </Typography>
            <Stack direction="row" spacing={1} className="pokemon-abilities">
              {abilityNames.map((ability) => (
                <Chip
                  key={ability}
                  label={ability}
                  variant="filled"
                  className="pokemon-ability-chip"
                />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className="pokemon-section-title">
              Estatísticas Base:
            </Typography>
            {stats?.map((stat) => (
              <Box key={stat.stat.name} className="pokemon-stats">
                <Typography variant="body2" className="pokemon-stat-label">
                  {stat.stat.name}: {stat.base_stat}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(stat.base_stat / 255) * 100}
                />
              </Box>
            ))}
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <PokemonWeaknesses weaknesses={weaknesses} />
        <Divider sx={{ my: 2 }} />
        <Box className="pokemon-audio">
          <IconButton
            aria-label="play cry"
            onClick={togglePlay}
            color="primary"
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <Typography
            variant="body2"
            color="text.secondary"
            className="pokemon-audio-text"
          >
            Tocar Cry
          </Typography>
        </Box>
        <audio
          ref={audioRef}
          src={cryUrl}
          onEnded={() => setIsPlaying(false)}
        />
      </CardContent>
    </Card>
  );
}

export default PokemonCard;
