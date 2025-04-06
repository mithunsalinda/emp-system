import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useRef, useState } from 'react';
import { useEmployeesListQuery } from '../../services/_Employees.service';
import { useEmployeeColumns } from './useEmployeeColumns';

ModuleRegistry.registerModules([AllCommunityModule]);
const EmployeesTable: React.FC = () => {
  const pageSize = 5;
  const gridRef = useRef<any>(null);
  const [page, setPage] = useState<number>(1);
  const { data = { data: [] }, isLoading: isProductLoading } = useEmployeesListQuery<any>({
    page,
    count: pageSize,
  });

  const handlePageChange = useCallback(() => {
    const currentPage = gridRef.current?.api.paginationGetCurrentPage();
    if (currentPage !== undefined) {
      setPage(currentPage + 1);
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <AgGridReact
        rowData={data}
        columnDefs={useEmployeeColumns()}
        pagination={true}
        paginationPageSize={pageSize}
        domLayout="autoHeight"
        onPaginationChanged={handlePageChange}
        suppressPaginationPanel={false}
        loading={isProductLoading}
      />
    </div>
  );
};

export default EmployeesTable;
