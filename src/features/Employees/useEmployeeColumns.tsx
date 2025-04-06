import { Image, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDeleteEmployeesMutation } from '../../services/_Employees.service';
import { useNavigate } from 'react-router-dom';
import Gender from '../../components/Gender';
import { confirmAndDeleteEmployee } from '../../hooks/confirmAndDeleteEmployee';

export const useEmployeeColumns = () => {
  const navigate = useNavigate();
  const [deleteEmployee] = useDeleteEmployeesMutation();
  const handleEdit = (id: string) => {
    navigate(`/employees/edit/${id}`);
  };

  return [
    {
      headerName: 'First Name',
      field: 'firstName',
      filter: true,
      cellRenderer: (params: any) => {
        const { profilePicture, firstName } = params.data || {};
        return profilePicture ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
            <Image
              width={30}
              height={30}
              src={profilePicture}
              alt="thumbnail"
              style={{ objectFit: 'cover', borderRadius: 4, overflow: 'hidden' }}
            />
            <span>{firstName}</span>
          </div>
        ) : (
          'N/A'
        );
      },
      flex: 0.15,
    },
    { field: 'lastName', flex: 0.15 },
    { field: 'email', flex: 0.21 },
    { field: 'dob', flex: 0.1 },
    {
      field: 'gender',
      flex: 0.08,
      cellStyle: { textAlign: 'right' },
      cellRenderer: (params: any) => (
        <>
          <span>{params.data.gender}</span>
          <Gender gender={params.data.gender} />
        </>
      ),
    },
    { field: 'phone', flex: 0.12 },
    { field: 'joinedDate', flex: 0.1 },
    {
      field: 'Actions',
      flex: 0.1,
      cellStyle: { textAlign: 'right' },
      headerClass: 'ag-right-aligned-header',
      cellRenderer: (params: any) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            style={{ marginRight: 10 }}
            onClick={() => handleEdit(params.data.id)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => confirmAndDeleteEmployee(params.data.id, deleteEmployee)}
          />
        </>
      ),
    },
  ];
};
