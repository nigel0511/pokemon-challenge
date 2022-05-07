import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { CardActions, CardContent, CardMedia } from "@mui/material";
import DisplayCaptured from "../components/displayCaptured";
import { AuthContext } from "../context/authContext";

const ariaLabel = { "aria-label": "description" };

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Capture() {
  let num = getRandomAnswer();
  const auth = useContext(AuthContext);
  const [guess, setGuess] = useState("");
  const [turn, setTurn] = useState(0);
  const [answer, setAnswer] = useState(num);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [min, max] = [0, 10];

  const createRandomPokemon = () => {
    let wildPokemon = [];
    for (let pokemon of auth.pokemon) {
      if (pokemon.OwnBy == "0") {
        wildPokemon.push(pokemon);
      }
    }
    let pokemonNum = Math.floor(Math.random() * (16 - 0 + 1) + 0);
    let pokemonLevel = Math.floor(Math.random() * (100 - 0 + 1) + 0);
    if (wildPokemon.length >= 1) {
      while (!wildPokemon[pokemonNum]) {
        pokemonNum = Math.floor(Math.random() * (16 - 0 + 1) + 0);
        pokemonLevel = Math.floor(Math.random() * (100 - 0 + 1) + 0);
      }
      wildPokemon = wildPokemon[pokemonNum];
      wildPokemon["level"] = pokemonLevel;
    } else {
      wildPokemon = [];
    }
    return wildPokemon;
  };

  let pokemon = createRandomPokemon();
  const [randomPokemon, setRandomPokemon] = useState(pokemon);

  const refreshPokemon = () => {
    let pokemon = createRandomPokemon();
    setRandomPokemon(pokemon);
  };

  const capturePokemon = () => {
    let pokemon = auth.pokemon;
    pokemon[randomPokemon.id].OwnBy = auth.userId;
    auth.updatePokemon(pokemon);
  };

  const inputHandler = (e) => {
    e.preventDefault();
    setGuess(e.target.value);
  };

  function getRandomAnswer() {
    return Math.floor(Math.random() * 10);
  }

  function reset() {
    setTurn(0);
    num = getRandomAnswer();
    setAnswer(num);
  }

  function checkAnswer(e) {
    e.preventDefault();
    if (guess < min || guess > max) {
      setMessage(`Answer is out of range ${min} - ${max}.`);
      setOpen(true);
    } else if (guess == answer) {
      capturePokemon();
      refreshPokemon();
      setMessage(`Congratulations! You have captured ${randomPokemon.name}!`);
      setOpen(true);
      reset();
    } else if (guess !== answer) {
      let num = turn + 1;
      if (num == 3) {
        setMessage("You guessed 3 times already, Pokemon escaped.");
        reset();
      } else if (guess < answer) {
        setMessage(
          `Answer is bigger than your guess! You guessed ${num} time.`
        );
        setTurn(num);
      } else if (guess > answer) {
        setMessage(
          `Answer is smaller than your guess! You guessed ${num} time.`
        );
        setTurn(num);
      }
      setOpen(true);
    }
  }

  return (
    <Box
      component="form"
      sx={{ flexGrow: 1 }}
      noValidate
      autoComplete="off"
      onSubmit={checkAnswer}
    >
      <Grid container spacing={1}>
        <Grid item xs={6} style={{ padding: 20 }}>
          <Card style={{ alignItems: "center" }}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Pokemon</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">HP</TableCell>
                    <TableCell align="right">Attack</TableCell>
                    <TableCell align="right">Defense</TableCell>
                    <TableCell align="right">Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key={randomPokemon.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <CardMedia
                        sx={{ maxWidth: 200 }}
                        component="img"
                        image={`${randomPokemon.name}.jpeg`}
                      ></CardMedia>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {randomPokemon.level}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {randomPokemon.name}
                    </TableCell>
                    <TableCell align="right">{randomPokemon.hp}</TableCell>
                    <TableCell align="right">{randomPokemon.attack}</TableCell>
                    <TableCell align="right">{randomPokemon.defense}</TableCell>
                    <TableCell align="right">{randomPokemon.type}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button onClick={refreshPokemon}>Catch another Pokemon</Button>
            <DisplayCaptured></DisplayCaptured>
          </Card>
        </Grid>
        <Grid item xs={6} style={{ padding: 20 }}>
          <Card>
            <CardMedia component="img" image="ash-pokeball.jpeg"></CardMedia>
            <CardContent>
              <Typography>
                To capture {randomPokemon.name}. Please guess a number between 0
                - 10:
              </Typography>
              <Input
                inputProps={ariaLabel}
                onChange={inputHandler}
                value={guess}
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" type="submit" id="submitButton">
                Submit
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ padding: 20 }}></Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}
