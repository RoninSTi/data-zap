import React from 'react';
import { Box, Checkbox, FormGroup, FormControlLabel, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import FileUpload from '../file-upload/file-upload.component';
import { useCreateLog } from '../../queries/log';

const RegisterSchema = Yup.object().shape({
    csvUrl: Yup.string().url('Invalid url').required('Csv is required'),
    isPublic: Yup.boolean().required('Public is required'),
    notes: Yup.string(),
    title: Yup.string().required('Title is required'),
});

interface SubmitValues {
    csvUrl: string;
    isPublic: boolean;
    notes?: string;
    title: string;
}

const Login = () => {
    const history = useHistory();

    const createLog = useCreateLog(history);

    const handleOnSubmit = async (values: SubmitValues) => {
        createLog.mutate(values);
    };

    const { errors, handleChange, handleSubmit, setFieldValue, touched, values } = useFormik({
        initialValues: {
            csvUrl: '',
            notes: '',
            isPublic: true,
            title: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: handleOnSubmit,
    });

    const handleOnUploadComplete = (url: string) => {
        setFieldValue('csvUrl', url);
    };

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
                New Log
            </Typography>
            <Box sx={{ mt: 1 }}>
                <form onSubmit={handleSubmit}>
                    {values.csvUrl ? (
                        <TextField
                            label="Data Url"
                            value={values.csvUrl}
                            fullWidth
                            required
                            disabled
                        />
                    ) : (
                        <FileUpload onUploadComplete={handleOnUploadComplete} />
                    )}

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Log Title"
                        name="title"
                        autoComplete="title"
                        value={values.title}
                        onChange={handleChange}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        id="notes"
                        label="Notes"
                        name="notes"
                        autoComplete="notes"
                        value={values.notes}
                        onChange={handleChange}
                        error={touched.notes && Boolean(errors.notes)}
                        helperText={touched.notes && errors.notes}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="isPublic"
                                    checked={values.isPublic}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            }
                            label="Public"
                        />
                    </FormGroup>
                    <LoadingButton
                        type="submit"
                        loading={createLog.isLoading}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Create Log
                    </LoadingButton>
                </form>
            </Box>
        </Box>
    );
};

export default Login;
