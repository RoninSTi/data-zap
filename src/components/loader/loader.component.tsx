import React, { FC } from 'react';

import Spinner from '../spinner/spinner.component';

interface LoaderProps {
    isLoading: boolean;
}

const Loader: FC<LoaderProps> = ({ children, isLoading }) => {
    return isLoading ? <Spinner /> : <>{children}</>;
};

export default Loader;
