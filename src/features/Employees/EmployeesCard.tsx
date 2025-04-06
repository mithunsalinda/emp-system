import React, { useState } from 'react';
import { Row, Col, Pagination, Spin } from 'antd';
import { useEmployeesListQuery } from '../../services/_Employees.service';
import EmployeeSingleCard from '../../components/EmployeeSingleCard';

const EmployeesCardList: React.FC = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const { data = { data: [], total: 0 }, isLoading } = useEmployeesListQuery<any>({
    page,
    count: pageSize,
  });

  const handlePageChange = (newPage: number) => setPage(newPage);

  if (isLoading) return <Spin />;

  return (
    <>
      <Row gutter={[16, 16]}>
        {data.map((employee: any) => (
          <Col span={12} key={employee.id} xs={12}>
            <EmployeeSingleCard {...employee} />
          </Col>
        ))}
      </Row>
      <Pagination
        current={page}
        pageSize={pageSize}
        total={data.total}
        onChange={handlePageChange}
        style={{ marginTop: 16, textAlign: 'center' }}
      />
    </>
  );
};

export default EmployeesCardList;
