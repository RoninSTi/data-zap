import React, { useRef } from 'react';
import { Box, TextField } from '@mui/material';

import Tags from '../tags/tags.component';

interface InputTagsProps {
    // eslint-disable-next-line
    onDeleteTag(tag: string): void;
    // eslint-disable-next-line
    onSubmitTag(tag?: string): void;
    tags: string[];
}

export default function InputTags({ onDeleteTag, onSubmitTag, tags }: InputTagsProps) {
    const tagRef = useRef<HTMLInputElement | null>();

    const handleOnDelete = (value: string) => {
        onDeleteTag(value);
    };

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmitTag(tagRef.current?.value);

            if (tagRef.current) tagRef.current.value = '';
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <TextField
                inputRef={tagRef}
                fullWidth
                sx={{ margin: '1rem 0' }}
                margin="none"
                label="Tags"
                InputProps={{
                    onKeyDown: handleOnKeyUp,
                    startAdornment: (
                        <Box sx={{ margin: '0 0.2rem 0 0', display: 'flex' }}>
                            {tags.map((data, index) => {
                                return <Tags data={data} onDelete={handleOnDelete} key={index} />;
                            })}
                        </Box>
                    ),
                }}
            />
        </Box>
    );
}
