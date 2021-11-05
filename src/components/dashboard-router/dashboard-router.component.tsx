import React from 'react';

import ComponentRouter from '../component-router/component-router.component';
import { PRIVATE_ROUTES } from '../../routes';

const DashboardRouter = () => {
    return <ComponentRouter routes={PRIVATE_ROUTES} />;
};

export default DashboardRouter;
