import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

import { useAppDispatch } from '../../redux/hooks';
import { setIsLoggedIn } from '../../redux/slices/auth';

const CookieCheck = () => {
    const dispatch = useAppDispatch();

    const [cookies] = useCookies(['access_expiration']);

    const expires = cookies?.access_expiration?.expires;

    useEffect(() => {
        if (expires && new Date(expires) > new Date()) {
            dispatch(setIsLoggedIn({ isLoggedIn: true }));
        }
    }, [dispatch, expires]);

    return null;
};

export default CookieCheck;
