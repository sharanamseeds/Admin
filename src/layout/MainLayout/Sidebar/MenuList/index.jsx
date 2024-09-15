import React from 'react';

// material-ui
import { Typography } from '@mui/material';

import NavGroup from './NavGroup';
import usePermissions from '../../../../component/pages/usePermissions';

// ==============================|| MENULIST ||============================== //

import {
  FaFileInvoiceDollar,
  FaHome,
  FaUser,
  FaBoxOpen,
  FaClipboardList,
  FaTags,
  FaUserShield,
  FaLanguage,
  FaFileAlt,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaTools,
  FaIcons,
  FaRegLifeRing, FaQuestion
} from 'react-icons/fa';
import { GiBlockHouse } from 'react-icons/gi';
import { ImBook } from "react-icons/im";
import { hasMenuPermission } from '../../../../helpers';

const icons = {
  NavigationOutlinedIcon: FaHome,
  HomeOutlinedIcon: FaHome,
  ChromeReaderModeOutlinedIcon: FaFileAlt,
  HelpOutlineOutlinedIcon: FaQuestion,
  SecurityOutlinedIcon: FaLock,
  AccountTreeOutlinedIcon: FaTools,
  BlockOutlinedIcon: GiBlockHouse,
  AppsOutlinedIcon: FaIcons,
  ContactSupportOutlinedIcon: FaRegLifeRing,
  UsersIcon: FaUser,
  BrandsIcon: FaBoxOpen,
  CategoryIcon: FaClipboardList,
  ProductsIcon: FaBoxOpen,
  OrdersIcon: FaClipboardList,
  PaymentsIcon: FaFileInvoiceDollar,
  OffersIcon: FaTags,
  NotificationsIcon: ImBook,
  RolesIcon: FaUserShield,
  LanguagesIcon: FaLanguage,
  LoginIcon: FaSignInAlt,
  RegisterIcon: FaUserPlus
};

const MenuList = ({ onMenuItemClick }) => {
  const permissions = usePermissions();
  const items = [
    {
      id: 'navigation',
      // title: 'Admin Panel',
      // caption: 'Dashboard',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/'
        },
        hasMenuPermission('Language', 'can_read', permissions) && {
          id: 'languages',
          title: 'Languages',
          type: 'item',
          icon: icons['LanguagesIcon'],
          url: '/languages'
        },
        hasMenuPermission('Role', 'can_read', permissions) && {
          id: 'roles',
          title: 'Roles',
          type: 'item',
          icon: icons['RolesIcon'],
          url: '/roles'
        },
        hasMenuPermission('User', 'can_read', permissions) && {
          id: 'users',
          title: 'Users',
          type: 'item',
          icon: icons['UsersIcon'],
          url: '/users'
        },
        hasMenuPermission('Brand', 'can_read', permissions) && {
          id: 'brands',
          title: 'Brands',
          type: 'item',
          icon: icons['BrandsIcon'],
          url: '/brands'
        },
        hasMenuPermission('Category', 'can_read', permissions) && {
          id: 'category',
          title: 'Category',
          type: 'item',
          icon: icons['CategoryIcon'],
          url: '/category'
        },
        hasMenuPermission('Product', 'can_read', permissions) && {
          id: 'products',
          title: 'Products',
          type: 'item',
          icon: icons['ProductsIcon'],
          url: '/products'
        },
        hasMenuPermission('Offer', 'can_read', permissions) && {
          id: 'offers',
          title: 'Offers',
          type: 'item',
          icon: icons['OffersIcon'],
          url: '/offers'
        },
        hasMenuPermission('Order', 'can_read', permissions) && {
          id: 'orders',
          title: 'Orders',
          type: 'item',
          icon: icons['OrdersIcon'],
          url: '/orders'
        },
        hasMenuPermission('Bill', 'can_read', permissions) && {
          id: 'Bills',
          title: 'Bills',
          type: 'item',
          icon: icons['PaymentsIcon'],
          url: '/bills'
        },
        hasMenuPermission('Ledger', 'can_read', permissions) && {
          id: 'ledgers',
          title: 'Ledgers',
          type: 'item',
          icon: icons['NotificationsIcon'],
          url: '/ledgers'
        },
      ]
    },
  ]

  const navItems = items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} onMenuItemClick={onMenuItemClick} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return navItems;
};

export default MenuList;
