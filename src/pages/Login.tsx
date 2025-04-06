import { Col, Grid, Row } from 'antd';
import { AuthForm } from '../features/Auth/AuthForm';
export const Login: React.FC = () => {
  const screens = Grid.useBreakpoint();
  return (
    <>
      <Row style={{ height: '100vh' }} className="loginLayout">
        <Col
          xs={24}
          md={24}
          lg={12}
          className={screens.lg ? 'leftLoginWrapper' : 'leftLoginWrapperMobile'}
        >
          <div className="loginWrapper">
            <h2>Login</h2>
            <AuthForm />
          </div>
        </Col>
        {screens.lg && (
          <Col lg={12} className="rightLoginWrapper">
            <h1 className="highlights__t1">
              Employee Management <br /> System
            </h1>
          </Col>
        )}
      </Row>
    </>
  );
};
