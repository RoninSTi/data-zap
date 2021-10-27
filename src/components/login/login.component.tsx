import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../redux/slices/auth';

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

    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
