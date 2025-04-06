import { Form, Input, Button, FormProps } from 'antd';
import { LoginRequest } from '../../types/login';
import { useLazyLoginQuery } from '../../services/_AuthForm.service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from './AuthForm.slice';

export const AuthForm: React.FC = () => {
  const [triggerLogin, { isLoading }] = useLazyLoginQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish: FormProps<LoginRequest>['onFinish'] = async (values) => {
    try {
      const result: any = await triggerLogin(values).unwrap();
      if (result.length > 0) {
        const user = result[0];
        const { email, role } = user;
        const userPayload = { email, role };
        dispatch(loginSuccess(userPayload));
        navigate('/dashboard');
      } else {
        console.error('Invalid credentials');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const onFinishFailed: FormProps<LoginRequest>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<LoginRequest>
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your Email!' },
          { type: 'email', message: 'Please enter a valid email address!' },
        ]}
      >
        <Input disabled={isLoading} />
      </Form.Item>

      <Form.Item<LoginRequest>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password disabled={isLoading} />
      </Form.Item>
      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
