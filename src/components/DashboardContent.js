'use client';
import React from 'react';
import { Card, Col, Row, Statistic, Button } from 'antd';
import { UserOutlined, CheckCircleOutlined, SolutionOutlined, CalendarOutlined } from '@ant-design/icons';
import Link from 'next/link';
const DashboardContent = () => {
  return (
    <div>
      <h1>Welcome to the Student Attendance Dashboard!</h1>
      <p>Here you can get a quick overview of your school's data.</p>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card variant="filled">
            <Statistic
              title="Total Students"
              value={45} 
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card variant="filled">
            <Statistic
              title="Today's Present"
              value={40}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card variant="filled">
            <Statistic
              title="Upcoming Exams"
              value={5} 
              prefix={<SolutionOutlined />}
              valueStyle={{ color: '#08c' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card variant="filled">
            <Statistic
              title="Events This Month"
              value={8} 
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#d46b08' }}
            />
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: 32 }}>
        <h2>Quick Actions</h2>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Card hoverable style={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3>Manage Students</h3>
                <p>Add, edit, or delete student records.</p>
              </div>
              <Link href="/students" passHref>
                <Button type="primary">Go to Students</Button>
              </Link>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card hoverable style={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3>Mark Attendance</h3>
                <p>Record daily attendance for all students.</p>
              </div>
              <Link href="/attendance" passHref>
                <Button type="primary">Go to Attendance</Button>
              </Link>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card hoverable style={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3>View Reports</h3>
                <p>Generate attendance and performance reports.</p>
              </div>
              <Link href="/reports" passHref>
                <Button type="primary">Go to Reports</Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default DashboardContent;