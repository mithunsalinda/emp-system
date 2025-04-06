import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { Employee } from '../types/employeeData';
const { Title } = Typography;
interface GenderCountWidgetProps {
  data: Employee[];
}
const GenderCountWidget: React.FC<GenderCountWidgetProps> = ({ data }) => {
  const maleEmployees = data?.filter((emo: Employee) => emo.gender === 'male').length;
  const femaleEmployees = data?.filter((emo: Employee) => emo.gender === 'female').length;

  return (
    <Card>
      <Title level={3} style={{ lineHeight: 0, paddingLeft: 15 }}>
        Employees
      </Title>
      <Row gutter={[16, 16]} className="card-emp">
        <Col span={10} className="card-emp-1">
          <p className="count">{maleEmployees + femaleEmployees}</p>
          <h3 className="card-title">Total Employees</h3>
        </Col>
        <Col span={7} className="card-emp-2">
          <p className="count">{maleEmployees}</p>
          <h3 className="card-title">Male</h3>
        </Col>
        <Col span={7} className="card-emp-3">
          <p className="count">{femaleEmployees}</p>
          <h3 className="card-title">Female</h3>
        </Col>
      </Row>
    </Card>
  );
};

export default GenderCountWidget;
