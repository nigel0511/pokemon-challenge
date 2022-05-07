import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const pages = ["Display", "Capture"];

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const auth = useContext(AuthContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const LogoutLink = (
    <Link to={"/"}>
      <Button
        key={"Logout"}
        onClick={auth.logOut}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {"Logout"}
      </Button>
    </Link>
  );

  const LoginLink = (
    <Link to={"Login"}>
      <Button
        key={"Login"}
        onClick={handleCloseNavMenu}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {"Login"}
      </Button>
    </Link>
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            POKEMON
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {auth.userId &&
                pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to={page}>
                      <Typography textAlign="center">{page}</Typography>
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {auth.userId && (
              <>
                <Link to={"display"}>
                  <Button
                    key={"display"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {"display"}
                  </Button>
                </Link>
                <Link to={"capture"}>
                  <Button
                    key={"capture"}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {"capture"}
                  </Button>
                </Link>
              </>
            )}
          </Box>
          {!auth.userId ? LoginLink : LogoutLink}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Nav;
