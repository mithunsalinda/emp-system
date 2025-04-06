import React from 'react';
import { ManOutlined, WomanOutlined, UserOutlined } from '@ant-design/icons';

const Gender: React.FC<{ gender: string }> = ({ gender }) => {
  switch (gender?.toLowerCase()) {
    case 'male':
      return <ManOutlined style={{ color: '#1890ff', marginLeft: 5 }} />;
    case 'female':
      return <WomanOutlined style={{ color: '#eb2f96' }} />;
    default:
      return <UserOutlined style={{ color: '#8c8c8c' }} />;
  }
};

export default Gender;
