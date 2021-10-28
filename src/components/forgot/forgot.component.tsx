import React from 'react';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { useAppDispatch } from '../../redux/hooks';
import { forgot } from '../../redux/slices/auth';

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
    const dispatch = useAppDispatch();

    const handleOnSubmit = (values: SubmitValues) => {
        const { email } = values;

        const data = { email };

        dispatch(forgot(data));
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
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Request Password
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

export default Forgot;
