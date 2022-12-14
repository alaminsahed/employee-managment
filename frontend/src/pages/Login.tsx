import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ socket }: any) => {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    postData();
  };

  const postData = () => {
    axios
      .post("http://localhost:5000/api/v1/login", {
        email: email,
        password: password,
      })
      .then((res: any) => {
        const { employeeExists } = res.data;

        socket?.emit("newUser", employeeExists.name);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.employeeExists));
        if (res.data.employeeExists.employeeStatus === "deactive") {
          alert("Your account is deactivated");
          return;
        }
        navigate("/home");
      })
      .catch((err: any) => {
        console.log(err.response);
        alert(err.response.data);
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: 400,
          width: { md: 400, xs: 300 },
          backgroundColor: "darkslategray",
          color: "white",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" onSubmit={onSubmit} noValidate sx={{ m: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            onChange={(e: any) => setEmail(e.target.value)}
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
            onChange={(e: any) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Link
          href="/forgetpassword"
          variant="button"
          sx={{ bgcolor: "white", padding: 1, borderRadius: 1 }}
        >
          Forget password
        </Link>
      </Box>
    </div>
  );
};

export default Login;
