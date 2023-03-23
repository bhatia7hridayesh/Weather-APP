import React from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../../state';
import { setFavourites } from '../../state';
function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getFavourites = async(token) => {
      const response = await fetch('http://127.0.0.1:8000/user/favourites/', {
          method: "GET",
          headers: { Authorization: `Bearer ${token.access}` },
      });
      const res_data = await response.json();
      console.log(res_data);
      if(res_data.code === "token_not_valid"){
          const newToken = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
              method: "POST",
              "headers": {"Content-Type": "application/json"},
              body: {refresh: token.refresh}
          })
          const newToken_data = await newToken.json();
          dispatch(setLogin({
              token: newToken_data
          }));   
      }
      dispatch(setFavourites({
          favourites: res_data
      }));
  }
    const handleSubmit = async(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const result = await fetch('http://127.0.0.1:8000/api/token/', {
            method: "POST",
            body: data
        });
        const res_data = await result.json();
        console.log(res_data);
        dispatch(
            setLogin({
                token: res_data
            })
        );
        getFavourites(res_data);
        navigate("/home");
      };
    
      return (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{  
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      );
    }
export default LoginPage;
