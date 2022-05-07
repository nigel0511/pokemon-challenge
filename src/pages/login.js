import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid"
import { useState, useContext } from "react";
import { CardActions, CardContent } from "@mui/material";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const auth = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const logInHandler = (e) => {
    e.preventDefault();
    auth.logIn(username, password);
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    auth.signUp(username, password);
  };

  return (
    <Grid
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 100
      }}
    >
      <Card sx={{minWidth:400}} >
        <CardContent>
          <Typography>Username</Typography>
          <TextField
            onChange={usernameHandler}
            value={username}
            id="username"
            required={true}
            style={{display: 'flex'}}
          ></TextField>
        </CardContent>
        <CardContent>
          <Typography>Password</Typography>
          <TextField
            type="password"
            onChange={passwordHandler}
            value={password}
            id="password"
            required={true}
            style={{display: 'flex'}}
          ></TextField>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            type="submit"
            id="submitButton"
            onClick={logInHandler}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            type="submit"
            id="submitButton"
            onClick={signUpHandler}
          >
            Sign up
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
