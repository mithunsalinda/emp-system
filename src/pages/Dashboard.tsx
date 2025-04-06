import React from 'react';
import EmployeesTable from '../features/Employees/EmployeesTable';
import { Col, Grid, Row, Typography } from 'antd';

import EmployeeStatsCard from '../components/EmployeeStatsCard';
const { Title } = Typography;
import EmployeesCard from '../features/Employees/EmployeesCard';
const { useBreakpoint } = Grid;
const Dashboard: React.FC = () => {
  const screens = useBreakpoint();
  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={8}>
          <Title level={3} style={{ lineHeight: 0 }}>
            Dashboard
          </Title>
        </Col>
      </Row>
      <EmployeeStatsCard />
      {screens.md ? <EmployeesTable /> : <EmployeesCard />}
    </div>
  );
};

export default Dashboard;
