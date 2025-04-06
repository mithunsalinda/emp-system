import React from 'react';
import { Card, Row, Col, Descriptions, Tag, Image } from 'antd';
import {  ManOutlined, WomanOutlined,  } from '@ant-design/icons';

interface EmployeeCardProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  dob: string;
  joinedDate: string;
  profilePicture?: string;
}

const EmployeeSingleCard: React.FC<EmployeeCardProps> = ({
  firstName,
  lastName,
  email,
  phone,
  gender,
  dob,
  joinedDate,
  profilePicture,
}) => {
  const fullName = `${firstName} ${lastName}`;
  const genderIcon = gender === 'male' ? <ManOutlined /> : <WomanOutlined />;

  return (
    <Card style={{ width: '100%', borderRadius: 12 }} className="mobileCardView">
      <Row>
        <Col span={24}>
          <Image
            width={135}
            height={135}
            src={profilePicture}
            alt="thumbnail"
            style={{ objectFit: 'cover', borderRadius: 4, overflow: 'hidden' }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} align="middle" style={{ marginTop: 16 }}>
        <Col span={24}>
          <h3 style={{ margin: 0 }} className="emp-user">
            {fullName}{' '}
            <Tag
              className="tag"
              color={gender === 'male' ? 'blue' : 'magenta'}
              icon={genderIcon}
            ></Tag>
          </h3>
          <div className="email" style={{ color: '#888' }}>
            {email}
          </div>
          <div style={{ color: '#888' }}>{phone}</div>
        </Col>
      </Row>

      <Descriptions column={1} layout="vertical" size="small" style={{ marginTop: 0 }}>
        <Descriptions.Item label="DOB">{new Date(dob).toLocaleDateString()}</Descriptions.Item>

        <Descriptions.Item label="Join Date">
          {new Date(joinedDate).toLocaleDateString()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default EmployeeSingleCard;
