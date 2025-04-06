import React from 'react';
import { Avatar, Card, List } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Employee } from '../types/employeeData';

interface RecentlyJoinedProps {
  data: Employee[];
}

const RecentlyJoined: React.FC<RecentlyJoinedProps> = ({ data }) => {
  const recentJoineEmployees = data
    .map((employee: Employee) => ({
      name: `${employee.firstName} ${employee.lastName}`,
      joined: employee.joinedDate,
    }))
    .sort((a: any, b: any) => new Date(b.joined).getTime() - new Date(a.joined).getTime())
    .slice(0, 5);

  return (
    <Card title="Recently Added">
      <List
        itemLayout="horizontal"
        dataSource={recentJoineEmployees}
        style={{ maxHeight: 140, overflowY: 'auto' }}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<ClockCircleOutlined />} />}
              title={item.name}
              description={`Joined on ${item.joined}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RecentlyJoined;
