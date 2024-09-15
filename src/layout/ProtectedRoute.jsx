import { Navigate } from 'react-router-dom';
import { hasPermission } from '../helpers';
import { AppConfig } from '../config/AppConfig';

export const ProtectedRoute = ({ children, permissions = [], moduleName, permissionType }) => {
    // Retrieve permissions from localStorage
    let otherPermissions = localStorage.getItem(AppConfig.localStorageKeys.permissions);
    if (otherPermissions) {
        otherPermissions = JSON.parse(otherPermissions);
    }

    // Use 'permissions' if it has values, otherwise use 'otherPermissions'
    const activePermissions = (permissions && permissions.length > 0) ? permissions : otherPermissions;

    const isAllowed = hasPermission(activePermissions, moduleName, permissionType);

    // Uncomment to enable protection logic
    return isAllowed ? children : <Navigate to="/" />;
};
