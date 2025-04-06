import { Layout, Spin, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navigations from '../components/Navigations';
import TopHeader from '../components/TopHeader';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const loading = useSelector((state: any) => state.loader.loading);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 992);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          backgroundColor: 'black',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          boxShadow: '0 2px 8px #f0f1f2',
          zIndex: 1001,
          position: 'fixed',
          width: '100%',
        }}
      >
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setDrawerVisible(!drawerVisible)}
            style={{ fontSize: 20, backgroundColor: 'white' }}
          />
        )}
        <TopHeader />
      </Header>

      <Layout style={{ paddingTop: 64 }}>
        {!isMobile && (
          <Sider
            width={255}
            style={{
              background: '#FFF',
              height: 'calc(100vh - 64px)',
              position: 'fixed',
              left: 0,
              top: 64,
              zIndex: 1000,
              overflowY: 'auto',
              boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Navigations />
          </Sider>
        )}
        <Drawer
          title="Menu"
          placement="left"
          closable
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={200}
        >
          <Navigations />
        </Drawer>
        <Layout
          style={{
            marginLeft: !isMobile ? 255 : 0,
            transition: 'margin-left 0.3s ease',
            backgroundColor: '#f0f2f5',
          }}
        >
          <Content
            style={{
              margin: 16,
              padding: 16,
              backgroundColor: '#FFF',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              minHeight: 'calc(100vh - 64px - 32px)',
            }}
          >
            <Spin spinning={loading} size="large">
              <Outlet />
            </Spin>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
