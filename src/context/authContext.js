import { createContext } from "react";

export const AuthContext = createContext({
  userId: null,
  users: null,
  pokemon: null,
  isLoggedIn : null,
  login: () => {},
  logOut: () => {},
  signUp: () => {},
  updatePokemon: () => {}
});
