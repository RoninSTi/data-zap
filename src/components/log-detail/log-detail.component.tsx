import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { fetchLog } from '../../queries/log';
import Loader from '../loader/loader.component';

const LogDetail = () => {
    const params: any = useParams();

    const { isLoading, data } = useQuery(['log', params?.logId], () =>
        fetchLog({ logId: params?.logId }),
    );

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
