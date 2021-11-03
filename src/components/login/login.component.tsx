import React from 'react';
import { Box, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Link, Redirect } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login, selectIsLoggedIn } from '../../redux/slices/auth';
import { selectIsLoading } from '../../redux/slices/ui';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        // Format Validation
        .email('Invalid email address format')
        // Required Field Validation
        .required('Email is required'),
    password: Yup.string()
        //Minimum Character Validation
        .min(3, 'Password must be 3 characters at minimum')
        .required('Password is required'),
});

interface SubmitValues {
    email: string;
    password: string;
}

const Login = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const isLoading = useAppSelector(selectIsLoading);

    const showLoading = isLoading.some((elem) => elem === 'auth/login');

    const handleOnSubmit = (values: SubmitValues) => {
        const { email, password } = values;

        const data = { email, password };

        dispatch(login(data));
    };

    const { errors, handleChange, handleSubmit, touched, values } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: handleOnSubmit,
    });

    if (isLoggedIn) return <Redirect to="/dashboard" />;

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
                Sign in
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <LoadingButton
                        type="submit"
                        loading={showLoading}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/forgot">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
