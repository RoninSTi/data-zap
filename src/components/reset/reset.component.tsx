import React from 'react';
import { Box, Grid, Link, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import { useReset } from '../../queries/auth';

const ResetSchema = Yup.object().shape({
    password: Yup.string()
        //Minimum Character Validation
        .min(3, 'Password must be 3 characters at minimum')
        .required('Password is required'),
});

interface SubmitValues {
    password: string;
}

const Forgot = () => {
    const history = useHistory();

    const { search } = useLocation();

    const reset = useReset(history);

    const query = queryString.parse(search);

    const handleOnSubmit = async (values: SubmitValues) => {
        const { password } = values;

        const data = { password, otp: query?.otp as string };

        reset.mutate(data);
    };

    const { errors, handleChange, handleSubmit, touched, values } = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: ResetSchema,
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
                Reset password
            </Typography>
            <Box sx={{ mt: 1 }}>
                <form onSubmit={handleSubmit}>
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
                    <LoadingButton
                        type="submit"
                        loading={reset.isLoading}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Reset Password
                    </LoadingButton>
                    <Grid container>
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
