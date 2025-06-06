import React from 'react';

import { Button, Space, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../features/Auth/AuthForm.slice';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';

interface TopHeaderProps {
  onToggleSidebar?: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector((state: any) => state.auth.user || {});

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/login');
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', zIndex: 10000 }}>
        {onToggleSidebar && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onToggleSidebar}
            style={{ fontSize: '18px', marginRight: 16 }}
          />
        )}
      </div>
      <Space>
        <Space wrap size={16}>
          <Avatar size={35} icon={<UserOutlined />} />
        </Space>
        <span style={{ color: '#FFF' }}>{email}</span>{' '}
        <Button onClick={handleLogout}>Log Out</Button>
      </Space>
    </>
  );
};

export default TopHeader;
