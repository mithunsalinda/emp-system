import { Card, Col, Row } from 'antd';
import { useEmployeesListQuery } from '../services/_Employees.service';
import PieChart from './PieChart';
import RecentlyJoined from './RecentlyJoined';
import GenderCountWidget from './GenderCoundWidget';

const EmployeeStatsCard = () => {
  const { data = { data: [] }, isLoading: isProductLoading } = useEmployeesListQuery<any>({
    page: 1,
    count: 5,
  });
  if (isProductLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16, marginTop: 16 }}>
      <Col xs={24} md={8}>
        <GenderCountWidget data={data} />
      </Col>
      <Col xs={24} md={8}>
        <Card>
          <PieChart data={data} />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <RecentlyJoined data={data} />
      </Col>
    </Row>
  );
};

export default EmployeeStatsCard;
