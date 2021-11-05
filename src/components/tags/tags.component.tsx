import React from 'react';
import { Chip } from '@mui/material';

interface TagsProps {
    data: string;
    // eslint-disable-next-line
    onDelete(data: string): void;
}

const Tags = ({ data, onDelete }: TagsProps) => {
    const handleOnDelete = () => {
        onDelete(data);
    };

    return (
        <Chip
            label={data}
            onDelete={handleOnDelete}
            sx={{
                marginRight: (theme) => theme.spacing(1),
                ':last-child': {
                    marginRight: 0,
                },
            }}
        />
    );
};

export default Tags;
