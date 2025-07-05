import StudentList from '../../components/StudentList.js';
export const metadata = {
  title: 'Students | AMS Dashboard',
};
export default function StudentsPage() {
  return (
    <>
      <h1 style={{ marginBottom: 24 }}>Student Management</h1>
      <StudentList />
    </>
  );
}