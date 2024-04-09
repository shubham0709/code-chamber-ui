import { Avatar, Button, TextField, Grid, Box, Typography, Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { HourglassEmpty } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { registerAPI } from "../../Redux/Auth/auth.action";
import { rootStateType } from "../../Redux/Store";
import { USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS } from "../../Redux/Auth/auth.actionTypes";

import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
  const newUserInitialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(newUserInitialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: rootStateType) => state.auth.register.isLoading);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    registerAPI(user, dispatch)
      .then((res) => {
        if (res.type === USER_REGISTER_SUCCESS) {
          setTimeout(() => {
            navigate("/auth/signin");
          }, 1000);
          toast.success("User registered successfully", {
            theme: "dark",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
          });
        } else if (res.type === USER_REGISTER_FAILURE) {
          toast.error(res.payload.response.data, {
            theme: "dark",
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer />
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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            disabled={isLoading}
            startIcon={isLoading ? <HourglassEmpty /> : null}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/auth/signin" className="underline text-xs">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
