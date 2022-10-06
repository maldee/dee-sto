import { Container, createTheme, CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import Inventory from "../../features/admin/Inventory";
import Catalog from "../../features/catalog/Catalog";
import React from "react";
import { amber, grey } from "@mui/material/colors";


const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: "#30304a"
          },
          secondary:{
            main: "#eaeaea"
          },
          divider: amber[200],
          background: {
            default: '#eaeaea',
            paper: '#fff',
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#fff",
          },
          secondary:{
            main: "#1c1c2b"
          },
          divider: amber[200],
          background: {
            default: '#1c1c2b',
            paper: '#30304a',
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});


function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [mode, setMode] = React.useState<PaletteMode>('light');

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);


  const [darkMode] = useState(false);

  function handleThemeChange() {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }

  if (loading) return <LoadingComponent message='Redirecting to Deeflow Global...' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container >
      <Route exact path='/' component={Catalog} />
      </Container>
      
      <Route path={'/(.+)'} render={() => (
      <Container>
        <Switch>
          <Route exact path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/server-error' component={ServerError} />
          <Route path='/basket' component={BasketPage} />
          <PrivateRoute path='/checkout' component={CheckoutWrapper} />
          <PrivateRoute path='/orders' component={Orders} />
          <PrivateRoute roles={['Admin']} path='/inventory' component={Inventory} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Container>
        )} />
    </ThemeProvider>
  );
}

export default App;
