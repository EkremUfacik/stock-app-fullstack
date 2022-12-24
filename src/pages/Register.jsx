import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Formik } from "formik";
import image from "../assets/sword.jpg";
import RegisterForm, { registerSchema } from "../components/RegisterForm";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import useAuthCalls from "../hooks/useAuthCalls";

const Register = () => {
  const { register } = useAuthCalls();

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" m={3} color="primary" align="center">
        STOCK APP
      </Typography>

      <Avatar
        sx={{
          m: "auto",
          width: 250,
          height: 250,
          boxShadow: "2px 2px 15px 5px black",
        }}
        src={image}
      ></Avatar>
      <Typography variant="h4" align="center" m={2} color="secondary.light">
        Register
      </Typography>

      <Formik
        initialValues={{
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values, actions) => {
          register({ ...values, password2: values.password });
          actions.resetForm();
          actions.setSubmitting(false);
        }}
        component={(props) => <RegisterForm {...props} />}
      ></Formik>
      <Box sx={{ textAlign: "center", mb: 4, mt: 2 }}>
        <Link to="/">Do you have an account?</Link>
      </Box>
    </Container>
  );
};

export default Register;
