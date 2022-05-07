import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

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

export default function DisplayCaptured() {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = React.useState("");

  let pokemonOwn = [];

  for (let pokemon of auth.pokemon) {
    if (pokemon.OwnBy == auth.userId) {
      pokemonOwn.push(pokemon);
    }
  }

  function releasePokemon(e) {
    e.preventDefault();
    let pokemons = auth.pokemon;
    for (let pokemon of pokemons) {
      if (pokemon.id == e.target.id) {
        pokemon.OwnBy = "0";
      }
    }
    auth.updatePokemon(pokemons);
    setMessage("Your pokemon had released to the wild.");
    setOpen(true);
  }

  let messageComponent;
  if (pokemonOwn.length == 0) {
    messageComponent = (
      <Card>
        <CardContent>
          You don't have any pokemon yet, go capture your pokemon!
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Captured Pokemon</TableCell>
              <TableCell>Level</TableCell>

              <TableCell>Name</TableCell>
              <TableCell align="right">HP</TableCell>
              <TableCell align="right">Attack</TableCell>
              <TableCell align="right">Defense</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Release Pokemon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonOwn.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <CardMedia
                    sx={{ maxWidth: 100 }}
                    component="img"
                    image={`${row.name}.jpeg`}
                  ></CardMedia>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.level}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.hp}</TableCell>
                <TableCell align="right">{row.attack}</TableCell>
                <TableCell align="right">{row.defense}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">
                  <Button onClick={releasePokemon} type="submit" id={row.id}>
                    Release
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {messageComponent}

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
      </TableContainer>
    </div>
  );
}
