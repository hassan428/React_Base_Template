import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Logout, Message } from '@mui/icons-material';
import { Stack, Zoom } from '@mui/material';
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { themeChange } from '../store/slices/themeSlice';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../store/slices/userLoggedSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';



const pages = ['Home', 'Messages', 'About'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const store = useSelector((store) => store);
    const { logged } = store;
    // console.log(messages)
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e) => {
        e === 'Logout' ? Logout() : setAnchorElUser(null);
    };

    const Logout = () => {


        setAnchorElUser(null);
        signOut(auth).then((res) => {
            console.log('Signed out', res);
        })
            .catch((error) => {
                console.log('Error signing out: ', error.message);
            });
    }
    // navigate("/");



    let theme = localStorage.getItem('theme');
    let themeTooltip = theme === "light" || theme == null ? "Light Mode" : "Dark Mode"
    let themeIcon = theme === "light" || theme == null ? <MdLightMode /> : <MdDarkMode />;

    const handelTheme = () => {

        if (theme === "dark") {
            localStorage.setItem("theme", "light");
            dispatch(themeChange("light"));
        } else {
            localStorage.setItem("theme", "dark");
            dispatch(themeChange("dark"));
        }
    };



    return (
        <AppBar position="static"
            sx={{
                bgcolor: "rgb(134 239 172)",
                color: "black",
            }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>


                    {/* LOGO md flex */}
                    <Message sx={{ display: { xs: 'none', md: 'flex' }, cursor: "pointer", mr: 0.5, alignItems: "center", }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            cursor: "pointer",
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'arial',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        MeSsAgE
                    </Typography>




                    {/* Heading xs flex */}

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
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
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>


                    {/* LOGO xs flex */}
                    <Message sx={{ display: { xs: 'flex', md: 'none' }, cursor: "pointer", mr: 0.5, alignItems: "center", }} />
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 0.5,
                            cursor: "pointer",
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'arial',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        MeSsAgE
                    </Typography>




                    {/* Heading md flex */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block', fontWeight: "bold" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>





                    {/* Theme Mode*/}
                    <Tooltip
                        title={themeTooltip}
                        TransitionComponent={Zoom}
                        arrow
                        slotProps={{
                            popper: {
                                sx: {
                                    [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                                    {
                                        bgcolor: "black",
                                        fontWeight: "bold"
                                    },
                                }
                            }
                        }}>
                        <IconButton onClick={handelTheme} sx={{ p: 0, mr: 2, }}>
                            {themeIcon}
                        </IconButton>
                    </Tooltip>


                    {/* Avatar*/}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip
                            title="Open settings"
                            TransitionComponent={Zoom}
                            arrow
                            slotProps={{
                                popper: {
                                    sx: {
                                        [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                                        {
                                            bgcolor: "black",
                                            fontWeight: "bold"
                                        },
                                    }
                                }
                            }}>

                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Stack alignItems={"center"}>
                                    <Avatar alt={logged.userDetails.username} src="" />
                                    <Typography>{logged.userDetails.username}</Typography>
                                </Stack>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};

export { Navbar };
