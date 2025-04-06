import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../store/apiCommon';
export const EmployeesService = createApi({
  reducerPath: 'EmployeesReducer',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Employees'],
  endpoints: (builder: any) => ({
    employeesList: builder.query({
      query: ({ page, count }: any) => {
        const start = (page - 1) * count;
        return {
          url: `/employees`,
          params: {
            start,
            count,
          },
        };
      },
      providesTags: ['Employees'],
    }),
    addEmployees: builder.mutation({
      query: (product: any) => ({
        url: `/employees`,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Employees'],
    }),
    editEmployees: builder.mutation({
      query: (product: any) => ({
        url: `/employees/${product.id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Employees'],
    }),
    deleteEmployees: builder.mutation({
      query: (id: any) => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employees'],
    }),
    employeesById: builder.query({
      query: (id: string) => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useEmployeesListQuery,
  useAddEmployeesMutation,
  useDeleteEmployeesMutation,
  useEditEmployeesMutation,
  useEmployeesByIdQuery,
  useLazyEmployeesByIdQuery,
} = EmployeesService;
