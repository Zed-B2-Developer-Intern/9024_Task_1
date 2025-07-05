import { Inter } from 'next/font/google';
import './globals.css';
import MainLayoutClient from '../components/MainLayoutClient';
import { ConfigProvider, theme, App } from 'antd';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AMS Dashboard',
  description: 'Student Attendance Management System Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: '#1677ff', 
            },
          }}
        >
          <App>
            <MainLayoutClient>
              {children}
            </MainLayoutClient>
          </App>
        </ConfigProvider>
      </body>
    </html>
  );
}