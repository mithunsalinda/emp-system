import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { Login } from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import AddEditEmployees from './features/Employees/AddEditEmployees';

import GuestLayout from './layouts/GuestLayout';
import ProtectedDashboardLayout from './layouts/ProtectedDashboardLayout';
import PageNotFound from './pages/PageNotFound';

const router = createBrowserRouter([
  {
    element: <GuestLayout />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    path: '/',
    element: <ProtectedDashboardLayout />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'employees', element: <Employees /> },
      { path: 'employees/add-new-employee', element: <AddEditEmployees /> },
      { path: 'employees/:mode/:id?', element: <AddEditEmployees /> },
    ],
  },
  { path: '*', element: <PageNotFound /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
