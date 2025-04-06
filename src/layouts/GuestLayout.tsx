import { Layout } from 'antd';
import { Outlet } from 'react-router';

const { Content } = Layout;

const GuestLayout = () => {
  return (
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default GuestLayout;
