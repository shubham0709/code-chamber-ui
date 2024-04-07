import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI } from "../../Redux/Auth/auth.action";
import { AxiosError } from "axios";
import * as types from "../../Redux/Auth/auth.actionTypes";
import { HourglassEmpty } from "@mui/icons-material";

interface SigninFormData {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.login.isLoading);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginAPI(formData))
      .then((res) => {
        switch (res.type) {
          case types.USER_LOGIN_SUCCESS: {
            console.log({ res });
            navigate("/");
            break;
          }
          case types.USER_LOGIN_FAILURE: {
            // Handle failure if needed
            break;
          }
          default:
            break;
        }
      })
      .catch((err: AxiosError) => {
        console.log({ err });
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
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
            value={formData.email || ""}
            onChange={handleChange}
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
            value={formData.password || ""}
            onChange={handleChange}
          />
          <Button
            disabled={isLoading}
            startIcon={isLoading ? <HourglassEmpty /> : null}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/auth/signup" className="underline text-xs">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
