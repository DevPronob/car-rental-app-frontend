import { ReactNode } from 'react'
import { useAppSelector } from '../../redux/hooks';
import { logout, useCurrentToken } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utilits/VerifyToken';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isExpired } from 'react-jwt';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProtectedRoute({ children, role }: { children: ReactNode, role: string | undefined }) {
    const dispatch = useDispatch()
    const token = useAppSelector(useCurrentToken);
    
    if (!token || isExpired(token)) {
        if (token) dispatch(logout());
        return <Navigate to='/login' replace={true} />
    }

    const user: any = verifyToken(token);

    if (!user) {
        dispatch(logout());
        return <Navigate to='/login' replace={true} />
    }

    if (role !== undefined && role !== user?.role) {
        // Don't logout, just redirect to unauthorized or home
        return <Navigate to="/" replace={true} />;
    }

    return <>{children}</>
}

export default ProtectedRoute