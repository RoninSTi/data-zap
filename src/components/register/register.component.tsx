import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, useHistory } from 'react-router-dom';

import { useRegister } from '../../queries/auth';

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address format').required('Email is required'),
    firstName: Yup.string(),
    lastName: Yup.string(),
    password: Yup.string()
        .min(3, 'Password must be 3 characters at minimum')
        .required('Password is required'),
    username: Yup.string().required('Username is required'),
});

interface SubmitValues {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    username: string;
}

const Register = () => {
    const history = useHistory();

    const register = useRegister(history);

    const handleOnSubmit = async (values: SubmitValues) => {
        register.mutate(values);
    };

    const { errors, handleChange, handleSubmit, touched, values } = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            username: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: handleOnSubmit,
    });

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}
        >
            <Typography component="h1" variant="h5">
                Create Account
            </Typography>
            <Box sx={{ mt: 1 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={values.username}
                        onChange={handleChange}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
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
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="firstName"
                        label="First Name"
                        id="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        id="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                    />
                    <LoadingButton
                        type="submit"
                        loading={register.isLoading}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create Account
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/login">Have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default Register;
