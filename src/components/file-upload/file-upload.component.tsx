import React from 'react';
import AwsS3 from '@uppy/aws-s3';
import Uppy from '@uppy/core';
import { DragDrop, ProgressBar, useUppy } from '@uppy/react';
import { nanoid } from '@reduxjs/toolkit';

import api from '../../services/api';

const getUploadParameters = async (file: any) => {
    const response = await api({
        method: 'post',
        url: 'upload',
        data: {
            fileName: nanoid(),
            fileType: file.type,
        },
        withCredentials: true,
    });

    return response.data;
};

interface FileUploadProps {
    // eslint-disable-next-line
    onUploadComplete(arg: string): void;
}

const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
    const uppy = useUppy(() => {
        return new Uppy({
            meta: { type: 'log' },
            restrictions: { maxNumberOfFiles: 1 },
            autoProceed: true,
        })
            .use(AwsS3, { getUploadParameters })
            .on('complete', (result) => {
                const url = result.successful[0].uploadURL;

                onUploadComplete(url);
            });
    });

    return (
        <>
            <DragDrop
                uppy={uppy}
                locale={{
                    strings: {
                        // Text to show on the droppable area.
                        // `%{browse}` is replaced with a link that opens the system file selection dialog.
                        dropHereOr: 'Drop here or %{browse}',
                        // Used as the label for the link that opens the system file selection dialog.
                        browse: 'browse',
                    },
                }}
            />
            <ProgressBar uppy={uppy} fixed hideAfterFinish />
        </>
    );
};

export default FileUpload;
