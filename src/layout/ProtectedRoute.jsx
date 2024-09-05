import { Navigate } from 'react-router-dom';
import { hasPermission } from '../helpers';

export const ProtectedRoute = ({ children, permissions, moduleName, permissionType }) => {
    const isAllowed = hasPermission(permissions, moduleName, permissionType);

    return isAllowed ? children : <Navigate to="/" />;
};
