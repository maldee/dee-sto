import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, styled, Toolbar, useTheme, useMediaQuery, alpha } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import DrawerMenu from "./DrawerMenu";
import SignedInMenu from "./SignedInMenu";
import SearchIcon from '@mui/icons-material/Search';
import ProductSearch from "../../features/catalog/ProductSearch";
import logo from '../../assests/deeflowstore.jpg';
import BrandLink from '@mui/material/Link';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const midLinks = [
    { title: 'shop', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' }
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: '#707090'
    }
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(2),
        width: 'auto',
    },
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(2.5),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));



export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector(state => state.basket);
    const { user } = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <AppBar position='static' elevation={0}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <BrandLink href="/">
                        <Box
                            component="img"
                            sx={{ height: 54 }}
                            alt="Logo"
                            src={logo}
                        />
                    </BrandLink>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>

                        <ProductSearch />
                    </Search>


                </Box>


                {
                    isMatch ? (
                        <>
                            <Box display='flex' alignItems='center'>

                                <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
                                <Badge badgeContent={itemCount} sx={{
                                        "& .MuiBadge-badge": {
                                            color: "white",
                                            backgroundColor: "#9c27b0"
                                        }
                                    }}>
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                                <IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit">
                                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                                <DrawerMenu />
                            </Box>

                        </>
                    ) : (
                        <>
                            <List sx={{ display: 'flex' }}>
                                {midLinks.map(({ title, path }) => (
                                    <ListItem
                                        component={NavLink}
                                        to={path}
                                        key={path}
                                        sx={navStyles}
                                    >
                                        {title.toUpperCase()}
                                    </ListItem>
                                ))}
                                {user && user.roles?.includes('Admin') &&
                                    <ListItem
                                        component={NavLink}
                                        to={'/inventory'}
                                        sx={navStyles}
                                    >
                                        INVENTORY
                                    </ListItem>}
                            </List>
                            <Box display='flex' alignItems='center'>

                                <IconButton component={Link} to='/basket' size='large' sx={{ color: 'inherit' }}>
                                    <Badge badgeContent={itemCount} sx={{
                                        "& .MuiBadge-badge": {
                                            color: "white",
                                            backgroundColor: "#9c27b0"
                                        }
                                    }}>
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>
                                {user ? (
                                    <SignedInMenu />
                                ) : (
                                    <List sx={{ display: 'flex' }}>
                                        {rightLinks.map(({ title, path }) => (
                                            <ListItem
                                                component={NavLink}
                                                to={path}
                                                key={path}
                                                sx={navStyles}
                                            >
                                                {title.toUpperCase()}
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                                <IconButton sx={{ ml: 1 }} onClick={handleThemeChange} color="inherit">
                                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                            </Box>
                        </>
                    )
                }



            </Toolbar>

        </AppBar>
    )
}