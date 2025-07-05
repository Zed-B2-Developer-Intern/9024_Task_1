'use client'; 
import React from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
  SolutionOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
const { Header, Content, Sider } = Layout; 
const MainLayoutClient = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { token: { colorBgContainer } } = theme.useToken(); 

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: '/students',
      icon: <UserOutlined />,
      label: <Link href="/students">Students</Link>,
    },
    {
      key: '/calendar',
      icon: <CalendarOutlined />,
      label: <Link href="/calendar">Calendar</Link>,
    },
    {
      key: '/examinations',
      icon: <SolutionOutlined />,
      label: <Link href="/examinations">Examinations</Link>,
    },
    {
      key: '/attendance',
      icon: <CheckCircleOutlined />,
      label: <Link href="/attendance">Attendance</Link>,
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: <Link href="/reports">Reports</Link>,
    },
  ];
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="80"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{ background: colorBgContainer }} 
        >
        <div className="demo-logo-vertical" style={{
          height: '64px',
          margin: '16px',
          background: 'rgba(0, 0, 0, 0.06)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#1677ff',
          fontSize: '24px',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          AMS
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '24px', borderBottom: '1px solid #f0f0f0' }}>
          <span style={{ marginRight: '16px', fontSize: '16px', color: '#555' }}>Welcome, Admin!</span>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.09)'
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayoutClient;