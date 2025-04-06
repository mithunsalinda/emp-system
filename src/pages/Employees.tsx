import React from 'react';
import EmployeesTable from '../features/Employees/EmployeesTable';
import { Button, Grid } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EmployeesCard from '../features/Employees/EmployeesCard';
const { useBreakpoint } = Grid;
const Employees: React.FC = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const addNewEmployee = () => {
    navigate(`/employees/add-new-employee`);
  };
  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="middle"
        style={{ marginBottom: 16 }}
        onClick={() => addNewEmployee()}
      >
        Add Employee
      </Button>
      {screens.md ? <EmployeesTable /> : <EmployeesCard />}
    </div>
  );
};

export default Employees;
