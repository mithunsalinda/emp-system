import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Radio, message, Upload } from 'antd';
import dayjs from 'dayjs';
import {
  useAddEmployeesMutation,
  useEditEmployeesMutation,
  useLazyEmployeesByIdQuery,
} from '../../services/_Employees.service';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnsavedChangesWarning } from '../../hooks/useUnsavedChangesWarning';
import { EmployeeData } from '../../types/employeeData';

const is18OrOlder = (date: dayjs.Dayjs) => {
  return dayjs().diff(date, 'year') >= 18;
};

const singaporePhoneRegex = /^(\+65)?[689]\d{7}$/;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const AddEditEmployees: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { id, mode } = useParams();
  const isEdit = mode === 'edit' && id;
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [formInitialized, setFormInitialized] = useState(false);
  const [trigger, { data: employeeData }] =
    useLazyEmployeesByIdQuery<EmployeeData>();

  const [addEmployee, { isLoading }] = useAddEmployeesMutation();
  const [updateEmployee, { isLoading: isUpdating }] = useEditEmployeesMutation();
  const [hasEdited, setHasEdited] = useState(false);

  useUnsavedChangesWarning(hasEdited, 'You have unsaved changes. Are you sure you want to leave?');
  useEffect(() => {
    if (id) {
      trigger(id);
    }
  }, [id, trigger]);

  useEffect(() => {
    if (isEdit && employeeData) {
      form.setFieldsValue({
        ...employeeData,
        dob: dayjs(employeeData.dob),
        joinedDate: dayjs(employeeData.joinedDate),
      });
      setProfilePic(employeeData.profilePicture || null);
      setFormInitialized(true);
    }
  }, [employeeData, isEdit, form]);

  const onFinish = async (values: any) => {
    try {
      const payload = {
        ...values,
        dob: values.dob.format('YYYY-MM-DD'),
        joinedDate: values.joinedDate.format('YYYY-MM-DD'),
        profilePicture: profilePic,
      };

      if (isEdit) {
        await updateEmployee({ id, ...payload }).unwrap();
        message.success('Employee updated successfully!');
      } else {
        await addEmployee(payload).unwrap();
        message.success('Employee added successfully!');
      }
      form.resetFields();
      setProfilePic(null);
      setHasEdited(false);
      navigate(-1);
    } catch (err) {
      message.error('Failed to add employee.');
    }
  };

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <Form
      {...layout}
      form={form}
      name="employeeForm"
      onFinish={onFinish}
      layout="vertical"
      onValuesChange={() => {
        if (formInitialized && !hasEdited && form.isFieldsTouched(true)) {
          setHasEdited(true);
        }
      }}
    >
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: 'Please enter your first name' },
              { min: 6, message: 'Minimum 6 characters' },
              { max: 10, message: 'Maximum 10 characters' },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: 'Please enter your last name' },
              { min: 6, message: 'Minimum 6 characters' },
              { max: 10, message: 'Maximum 10 characters' },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email' },
            ]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              {
                pattern: singaporePhoneRegex,
                message: 'Enter a valid Singapore phone number',
              },
            ]}
          >
            <Input placeholder="e.g. +6581234567" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select your gender' }]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Joined Date"
            name="joinedDate"
            rules={[{ required: true, message: 'Please select your joined date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              { required: true, message: 'Please select your date of birth' },
              {
                validator: (_, value) =>
                  value && !is18OrOlder(value)
                    ? Promise.reject(new Error('You must be at least 18 years old'))
                    : Promise.resolve(),
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12}>
          <Form.Item
            label="Profile Picture"
            name="profilePicture"
            rules={[{ required: true, message: 'Please upload a profile picture' }]}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={async (file) => {
                const base64 = await getBase64(file);
                setProfilePic(base64);
                return false; 
              }}
              onRemove={() => setProfilePic(null)}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {profilePic && (
              <img
                src={profilePic}
                alt="Preview"
                style={{ marginTop: 10, maxWidth: 100, borderRadius: 8 }}
              />
            )}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="default"
          loading={isLoading || isUpdating}
          onClick={() => navigate(-1)}
          style={{ marginRight: 8 }}
        >
          Back
        </Button>
        <Button type="primary" htmlType="submit" loading={isLoading || isUpdating}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddEditEmployees;
