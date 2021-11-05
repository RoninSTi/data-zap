import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { fetchLog, useViewLog } from '../../queries/log';
import Loader from '../loader/loader.component';

const LogDetail = () => {
    const params: any = useParams();

    const viewLog = useViewLog();

    const { isLoading, data } = useQuery(['log', params?.logId], () =>
        fetchLog({ logId: params?.logId }),
    );

    useEffect(() => {
        if (params?.logId) viewLog.mutate({ logId: params?.logId });
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div>{`Log detail: ${params?.logId}`}</div>
            <Loader isLoading={isLoading}>
                <div>{`Log title: ${data?.title}`}</div>
            </Loader>
        </div>
    );
};

export default LogDetail;
