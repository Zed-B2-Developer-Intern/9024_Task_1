import AttendanceCalendar from '../../components/AttendanceCalendar.js';
export const metadata = {
  title: 'Attendance | AMS Dashboard',
};
export default function AttendancePage() {
  return (
    <>
      <h1 style={{ marginBottom: 24 }}>Student Attendance</h1>
      <AttendanceCalendar />
    </>
  );
}