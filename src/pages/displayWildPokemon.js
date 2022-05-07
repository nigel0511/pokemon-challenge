import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
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

export default function DisplayWildPokemon() {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = React.useState("");

  let pokemonWild = [];

  for (let pokemon of auth.pokemon) {
    if (pokemon.OwnBy == "0") {
      pokemonWild.push(pokemon);
    }
  }

  let messageComponent;
  if (pokemonWild.length == 0) {
    messageComponent = (
      <Card>
        <CardContent>Congratulations! You've Catch'em All!</CardContent>
      </Card>
    );
  }

  return (
    <div style={{ padding: 50 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Wild Pokemons</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell>
              {pokemonWild.map((row) => (
                <>
                  <img src={`${row.name}.jpeg`} id={row.name}></img>
                  <label for={row.name}>{row.name}</label>
                </>
              ))}
            </TableCell>
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
