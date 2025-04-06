import React from 'react';
import {
  DashboardOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/dashboard',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  {
    key: '/employees',
    label: 'Employees',
    icon: <UserOutlined />,
  },
  {
    key: '/employess/add-new-employee',
    label: 'Add Employee',
    icon: <PlusOutlined />,
  },
  {
    key: '/settings',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
];

const Navigations: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default Navigations;
