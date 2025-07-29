import { Empty } from 'antd';

export const metadata = {
  title: 'Examinations | AMS Dashboard',
};
export default function ExaminationsPage() {
  return (
    <>
      <h1 style={{ marginBottom: 24 }}>Examinations</h1>
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            No examination data available yet.
          </span>
        }
      />
    </>
  );
}