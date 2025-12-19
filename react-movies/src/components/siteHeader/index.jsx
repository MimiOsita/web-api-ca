import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "../../api/tmdb-api";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const COLORS = {
  headerText: "#ffffff",
  hoverBg: "FFD700",
  hoverText: "#1a1a1a",
};

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElGenres, setAnchorElGenres] = useState(null);
  const open = Boolean(anchorEl);
  const openGenres = Boolean(anchorElGenres);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
  const genres = data?.genres || [];

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top_rated" },
    { label: "Now Playing", path: "/movies/now_playing" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    setAnchorElGenres(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenGenres = (event) => setAnchorElGenres(event.currentTarget);
  const handleCloseGenres = () => setAnchorElGenres(null);
  const handleGenreSelect = (id) => {
    handleMenuSelect(`/genres/${id}`);
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mimi's Movie App!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                      sx={{
                        "&:hover": {
                          backgroundColor: COLORS.hoverBg,
                          color: COLORS.hoverText,
                        },
                      }}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
              
                    {genres.map((g) => (
                      <MenuItem 
                      key={g.id} 
                      onClick={() => handleGenreSelect(g.id)}
                      sx={{
                        "&:hover": {
                          backgroundColor: COLORS.hoverBg,
                          color: COLORS.hoverText,
                        },
                      }}
                    >
                        {g.name}
                      </MenuItem>
                    ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{
                      color: COLORS.headerText,
                      "&:hover": {
                        backgroundColor: COLORS.hoverBg,
                        color: COLORS.hoverText,
                      },
                    }}
                  >
                    {opt.label}
                  </Button>
                ))}
                  <Button
                  color="inherit"
                  onClick={handleOpenGenres}
                  sx={{
                    color: COLORS.headerText,
                    "&:hover": {
                      backgroundColor: COLORS.hoverBg,
                      color: COLORS.hoverText,
                    },
                  }}
                >
                  Browse by Genre
                </Button>
                <Menu 
                id="genres-menu"
                anchorEl={anchorElGenres}
                open={openGenres}
                onClose={handleCloseGenres}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                  {genres.map((g) => (
                    <MenuItem
                    key={g.id} 
                    sx={{
                      "&:hover": {
                        backgroundColor: COLORS.hoverBg,
                        color: COLORS.hoverText,
                      },
                    }}
                    onClick={() => handleGenreSelect(g.id)}>
                      {g.name}
                    </MenuItem>
                  ))}
              </Menu>
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
