import { Empty } from 'antd';
export const metadata = {
  title: 'Reports | AMS Dashboard',
};
export default function ReportsPage() {
  return (
    <>
      <h1 style={{ marginBottom: 24 }}>Reports</h1>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            No reports generated yet.
          </span>
        }
      />
    </>
  );
}