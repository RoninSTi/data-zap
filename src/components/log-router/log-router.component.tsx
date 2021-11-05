import React from 'react';

import ComponentRouter from '../component-router/component-router.component';
import { LOG_ROUTES } from '../../routes';

const LogRouter = () => {
    return <ComponentRouter routes={LOG_ROUTES} />;
};

export default LogRouter;
