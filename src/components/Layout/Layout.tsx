import { useState } from 'react';

import { AppBar, Box, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Outlet, Link as RouterLink } from 'react-router-dom';

const Layout = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar position='static'>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem href='/'>
                  <Typography textAlign="center">Simple Form</Typography>
                </MenuItem>
                <MenuItem href='/anotherForm'>
                  <Typography textAlign="center">Complex Form</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, gap: 2, display: { xs: 'none', md: 'flex' } }}>
              <Link color="#fff" component={RouterLink} to="/">Simple Form</Link>
              <Link color="#fff" component={RouterLink} to="/anotherForm">Complex Form</Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ marginTop: 4 }} maxWidth="lg">
        <Outlet />
      </Container>
    </>
  )
};

export default Layout;
