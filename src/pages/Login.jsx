import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import image from "../assets/stock.jpg";

import { Link } from "react-router-dom";
import LoginForm, { loginSchema } from "../components/LoginForm";

import useAuthCalls from "../hooks/useAuthCalls";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const { login } = useAuthCalls();
  const guest = {
    email: process.env.REACT_APP_GUEST_EMAIL,
    password: process.env.REACT_APP_GUEST_PASSWORD,
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" m={3} color="primary" align="center">
        STOCK APP
      </Typography>

      <Box sx={{ textAlign: "center" }}>
        <img
          style={{
            width: 400,
            height: 250,
            boxShadow: "2px 2px 15px 5px black",
          }}
          src={image}
          alt="login"
        />
      </Box>
      <Typography variant="h4" align="center" m={2} color="secondary.light">
        Login
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          login(values);
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        component={(props) => <LoginForm {...props} />}
      ></Formik>
      <LoadingButton
        // loading={loading}
        loadingPosition="center"
        variant="outlined"
        onClick={() => login(guest)}
        sx={{
          mt: 2,
          mx: "auto",
          display: "block",
        }}
      >
        Login as Guest
      </LoadingButton>
      <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
        <Link to="/register">Do you have not an account?</Link>
      </Box>
    </Container>
  );
};

export default Login;
