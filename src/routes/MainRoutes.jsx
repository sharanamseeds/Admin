import React, { lazy, useEffect } from 'react';


import MainLayout from '../layout/MainLayout';
import Loadable from '../component/Loadable';

import AuthLayout from '../layout/AuthLayout';
import { ProtectedRoute } from '../layout/ProtectedRoute';
import usePermissions from '../component/pages/usePermissions';
import { AppConfig } from '../config/AppConfig';
import { setPermissions } from '../redux/slices/permissionSlice';
import { useDispatch } from 'react-redux';


const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard/Default')));
const UnauthorizedDashboard = Loadable(lazy(() => import('../views/Dashboard/UnauthorizedDashboard')));
const UserList = Loadable(lazy(() => import("../component/pages/Users/UserList")));
const AddUser = Loadable(lazy(() => import("../component/pages/Users/AddUser")));
const EditUser = Loadable(lazy(() => import("../component/pages/Users/EditUser")));
const ViewUser = Loadable(lazy(() => import("../component/pages/Users/ViewUser")));

const BrandList = Loadable(lazy(() => import("../component/pages/Products/Brand/BrandList")));
const AddBrand = Loadable(lazy(() => import("../component/pages/Products/Brand/AddBrand")));
const EditBrand = Loadable(lazy(() => import("../component/pages/Products/Brand/EditBrand")));
const ViewBrand = Loadable(lazy(() => import("../component/pages/Products/Brand/ViewBrand")));

const AddCategory = Loadable(lazy(() => import("../component/pages/Products/Category/AddCategory")));
const CategoryList = Loadable(lazy(() => import("../component/pages/Products/Category/CategoryList")));
const EditCategory = Loadable(lazy(() => import("../component/pages/Products/Category/EditCategory")));
const ViewCategory = Loadable(lazy(() => import("../component/pages/Products/Category/ViewCategory")));

const AddProduct = Loadable(lazy(() => import("../component/pages/Products/Product/AddProduct")));
const EditProduct = Loadable(lazy(() => import("../component/pages/Products/Product/EditProduct")));
const ProductList = Loadable(lazy(() => import("../component/pages/Products/Product/ProductList")));
const ViewProduct = Loadable(lazy(() => import("../component/pages/Products/Product/ViewProduct")));

const AddOffers = Loadable(lazy(() => import("../component/pages/Pramotions/Offers/AddOffers")));
const EditOffers = Loadable(lazy(() => import("../component/pages/Pramotions/Offers/EditOffers")));
const ListOffers = Loadable(lazy(() => import("../component/pages/Pramotions/Offers/ListOffers")));
const ViewOffers = Loadable(lazy(() => import("../component/pages/Pramotions/Offers/ViewOffers")));

const BillList = Loadable(lazy(() => import("../component/pages/Bills/BillList")));
const ViewBill = Loadable(lazy(() => import("../component/pages/Bills/ViewBill")));
const EditBill = Loadable(lazy(() => import("../component/pages/Bills/EditBill")));

const LedgerList = Loadable(lazy(() => import("../component/pages/Ledger/LedgerList")));
const LedgerListUser = Loadable(lazy(() => import("../component/pages/Ledger/LedgerListUser")));
const ViewLedger = Loadable(lazy(() => import("../component/pages/Ledger/ViewLedger")));

const AddOrders = Loadable(lazy(() => import("../component/pages/Orders/AddOrders")));
const EditOrders = Loadable(lazy(() => import("../component/pages/Orders/EditOrders")));
const OrdersList = Loadable(lazy(() => import("../component/pages/Orders/OrdersList")));
const ReturnOrder = Loadable(lazy(() => import("../component/pages/Orders/ReturnOrder")));
const ViewOrders = Loadable(lazy(() => import("../component/pages/Orders/ViewOrders")));

const RoleList = Loadable(lazy(() => import("../component/pages/Roles/RoleList")));
const LanguageList = Loadable(lazy(() => import("../component/pages/Languages/LanguageList")));
const AddRole = Loadable(lazy(() => import("../component/pages/Roles/AddRole")));
const ViewRole = Loadable(lazy(() => import("../component/pages/Roles/ViewRole")));
const EditRole = Loadable(lazy(() => import("../component/pages/Roles/EditRole")));
const EditLanguage = Loadable(lazy(() => import("../component/pages/Languages/EditLanguage")));
const ViewLanguage = Loadable(lazy(() => import("../component/pages/Languages/ViewLanguage")));
const AddLanguage = Loadable(lazy(() => import("../component/pages/Languages/AddLanguage")));



const MainRoutes = () => {
  const permissions = usePermissions();
  const dispatch = useDispatch();
  useEffect(() => {
    if (permissions.length <= 0) {
      const localPermissions = localStorage.getItem(
        AppConfig.localStorageKeys.permissions
      )
      if (localPermissions) {
        const data = JSON.parse(localPermissions);
        dispatch(setPermissions(data))
      }
    }
    //eslint-disable-next-line
  }, [])
  return {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '',
            element: permissions && permissions?.length > 0 ? <DashboardDefault /> : < UnauthorizedDashboard />
          },
        ],
      },
      {
        path: '/languages',
        element: <AuthLayout />,
        children: [
          {
            path: '',
            element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Language"
                permissionType="can_read"
              >
                <LanguageList permission={permissions?.find(item => item.module_name === "Language")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/:id',
            element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Language"
                permissionType="can_update"
              >
                <EditLanguage permission={permissions?.find(item => item.module_name === "Language")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id',
            element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Language"
                permissionType="can_read"
              >
                <ViewLanguage permission={permissions?.find(item => item.module_name === "Language")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'add',
            element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Language"
                permissionType="can_add"
              >
                <AddLanguage permission={permissions?.find(item => item.module_name === "Language")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/roles',
        element: <AuthLayout />,
        children: [
          {
            path: '',
            element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Role"
                permissionType="can_read"
              >
                <RoleList permission={permissions?.find(item => item.module_name === "Role")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/:id'
            , element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Role"
                permissionType="can_update"
              >
                <EditRole permission={permissions?.find(item => item.module_name === "Role")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id'
            , element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Role"
                permissionType="can_read"
              >
                <ViewRole permission={permissions?.find(item => item.module_name === "Role")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'add'
            , element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Role"
                permissionType="can_add"
              >
                <AddRole permission={permissions?.find(item => item.module_name === "Role")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/users',
        element: <AuthLayout />,
        children: [
          {
            path: '', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="User"
                permissionType="can_read"
              >
                <UserList permission={permissions?.find(item => item.module_name === "User")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="User"
                permissionType="can_update"
              >
                <EditUser permission={permissions?.find(item => item.module_name === "User")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="User"
                permissionType="can_read"
              >
                <ViewUser permission={permissions?.find(item => item.module_name === "User")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'add', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="User"
                permissionType="can_add"
              >
                <AddUser permission={permissions?.find(item => item.module_name === "User")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/brands',
        element: <AuthLayout />,
        children: [
          {
            path: '', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Brand"
                permissionType="can_read"
              >
                <BrandList permission={permissions?.find(item => item.module_name === "Brand")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Brand"
                permissionType="can_update"
              >
                <EditBrand permission={permissions?.find(item => item.module_name === "Brand")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Brand"
                permissionType="can_read"
              >
                <ViewBrand permission={permissions?.find(item => item.module_name === "Brand")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'add', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Brand"
                permissionType="can_add"
              >
                <AddBrand permission={permissions?.find(item => item.module_name === "Brand")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/category',
        element: <AuthLayout />,
        children: [
          {
            path: '', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Category"
                permissionType="can_read"
              >
                <CategoryList permission={permissions?.find(item => item.module_name === "Category")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Category"
                permissionType="can_update"
              >
                <EditCategory permission={permissions?.find(item => item.module_name === "Category")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Category"
                permissionType="can_read"
              >
                <ViewCategory permission={permissions?.find(item => item.module_name === "Category")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'add', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Category"
                permissionType="can_add"
              >
                <AddCategory permission={permissions?.find(item => item.module_name === "Category")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/products',
        element: <AuthLayout />,
        children: [
          {
            path: '', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Product"
                permissionType="can_read"
              >
                <ProductList permission={permissions?.find(item => item.module_name === "Product")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Product"
                permissionType="can_update"
              >
                <EditProduct permission={permissions?.find(item => item.module_name === "Product")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Product"
                permissionType="can_read"
              >
                <ViewProduct permission={permissions?.find(item => item.module_name === "Product")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'add', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Product"
                permissionType="can_add"
              >
                <AddProduct permission={permissions?.find(item => item.module_name === "Product")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/orders',
        element: <AuthLayout />,
        children: [
          {
            path: '', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Order"
                permissionType="can_read"
              >
                <OrdersList permission={permissions?.find(item => item.module_name === "Order")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Order"
                permissionType="can_update"
              >
                <EditOrders permission={permissions?.find(item => item.module_name === "Order")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Order"
                permissionType="can_read"
              >
                <ViewOrders permission={permissions?.find(item => item.module_name === "Order")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'return/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Order"
                permissionType="can_add"
              >
                <ReturnOrder permission={permissions?.find(item => item.module_name === "Order")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'add', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Order"
                permissionType="can_add"
              >
                <AddOrders permission={permissions?.find(item => item.module_name === "Order")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/bills',
        element: <AuthLayout />,
        children: [
          {
            path: '', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Bill"
                permissionType="can_read"
              >
                <BillList permission={permissions?.find(item => item.module_name === "Bill")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Bill"
                permissionType="can_read"
              >
                <ViewBill permission={permissions?.find(item => item.module_name === "Bill")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Bill"
                permissionType="can_update"
              >
                <EditBill permission={permissions?.find(item => item.module_name === "Bill")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/ledgers',
        element: <AuthLayout />,
        children: [
          {
            path: '', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Ledger"
                permissionType="can_read"
              >
                <LedgerList permission={permissions?.find(item => item.module_name === "Ledger")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'user/', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Ledger"
                permissionType="can_read"
              >
                <LedgerListUser permission={permissions?.find(item => item.module_name === "Ledger")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Ledger"
                permissionType="can_read"
              >
                <ViewLedger permission={permissions?.find(item => item.module_name === "Ledger")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/offers',
        element: <AuthLayout />,
        children: [
          {
            path: '', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Offer"
                permissionType="can_read"
              >
                <ListOffers permission={permissions?.find(item => item.module_name === "Offer")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Offer"
                permissionType="can_update"
              >
                <EditOffers permission={permissions?.find(item => item.module_name === "Offer")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view/:id', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Offer"
                permissionType="can_read"
              >
                <ViewOffers permission={permissions?.find(item => item.module_name === "Offer")} />
              </ProtectedRoute>
            ),
          },
          {
            path: 'add', element: (
              <ProtectedRoute
                permissions={permissions}
                moduleName="Offer"
                permissionType="can_add"
              >
                <AddOffers permission={permissions?.find(item => item.module_name === "Offer")} />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // {
      //   path: '/notifications',
      //   element: <AuthLayout />,
      //   children: [
      //     { path: '', element: <NotificationsList /> },
      //     { path: 'edit/:id', element: <EditNotifications /> },
      //     { path: 'view/:id', element: <ViewNotifications /> },
      //     { path: 'add', element: <AddNotifications /> },
      //   ],
      // },
    ]
  }
}


export default MainRoutes;
