import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useForgot } from '../../queries/auth';

const ForgotSchema = Yup.object().shape({
    email: Yup.string()
        // Format Validation
        .email('Invalid email address format')
        // Required Field Validation
        .required('Email is required'),
});

interface SubmitValues {
    email: string;
}

const Forgot = () => {
    const forgot = useForgot();

    const handleOnSubmit = (values: SubmitValues) => {
        forgot.mutate(values);
    };

    const { errors, handleChange, handleSubmit, touched, values } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: ForgotSchema,
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
                Forgot password?
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
                    <LoadingButton
                        type="submit"
                        loading={forgot.isLoading}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Request Password
                    </LoadingButton>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/login">Sign in</Link>
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

export default Forgot;
