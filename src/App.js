import { useContext, useState } from "react";
import { AuthContext } from "./context/authContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/nav";
import DisplayWildPokemon from "./pages/displayWildPokemon";
import Capture from "./pages/capture";
import Login from "./pages/login";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import pokemonData from "./data/pokemon.json";

let usersData = [];
let data = pokemonData.pokemon;

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

function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState(usersData);
  const [userId, setUserId] = useState(null);
  const [pokemon, setPokemon] = useState(data);
  const auth = useContext(AuthContext);

  function checkLogIn(username, password) {
    for (let user of users) {
      if (user.username == username && user.password == password) {
        setUserId(user.id);
        return true;
      }
    }
    return false;
  }

  const updatePokemon = (pokemon) => {
    setPokemon(pokemon);
  };

  const logIn = (username, password) => {
    if (checkLogIn(username, password)) {
      setIsLoggedIn(true);
      setMessage("Log in successful.");
      setOpen(true);
      return (<Navigate to ="/capture"></Navigate>)
    } else {
      setMessage("Log in fail.");
      setOpen(true);
    }
  };

  const logOut = () => {
    setUserId(null);
    setMessage("Log out successful.");
    setOpen(true);
  };

  function checkSignUp(username) {
    for (let user of users) {
      if (user.username == username) {
        return true;
      }
    }
    return false;
  }

  const signUp = (username, password) => {
    if (!checkSignUp(username)) {
      setIsLoggedIn(true);
      let newUserId = users.length + 1;
      let newUsers = users;
      newUsers.push({
        username: username,
        password: password,
        id: newUserId,
      });
      setUsers(newUsers);
      setUserId(newUserId);
      setMessage("Sign up successful.");
      setOpen(true);
      return (<Navigate to ="/capture"></Navigate>)

      console.log(users);
    } else {
      setMessage("This username is taken, please choose another username.");
      setOpen(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        users: users,
        userId: userId,
        logIn: logIn,
        logOut: logOut,
        signUp: signUp,
        isLoggedIn: isLoggedIn,
        pokemon: pokemon,
        updatePokemon: updatePokemon,
      }}
    >
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />}></Route>;
          <Route path="/login" element={<Login />}></Route>;
          <Route path="/display" element={<DisplayWildPokemon />}></Route>
          <Route path="/capture" element={<Capture />}></Route>
        </Routes>
      </Router>
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
    </AuthContext.Provider>
  );
}

export default App;
