'use client';
import React, { useState } from 'react';
import { Calendar, Badge, Select, Button, Modal, Form, DatePicker, notification, Input } from 'antd';
import moment from 'moment';

const { Option } = Select;
const students = [
  { id: '1', name: 'Alice Johnson', rollNo: 'S001' },
  { id: '2', name: 'Bob Williams', rollNo: 'S002' },
  { id: '3', name: 'Charlie Brown', rollNo: 'S003' },
  { id: '4', name: 'Diana Prince', rollNo: 'S004' },
  { id: '5', name: 'Diana', rollNo: 'S005' },
  { id: '6', name: 'stalin', rollNo: 'S006' },
  { id: '7', name: 'mk', rollNo: 'S007' },
  { id: '8', name: 'john', rollNo: 'S008' },
];
const initialAttendance = {
  '2025-07-01': {
    'S001': 'present',
    'S002': 'absent',
    'S003': 'present',
    'S004': 'present',
    'S005': 'present',
    'S006': 'absent',
    'S007': 'present',
    'S008': 'present',
  },
  '2025-07-02': {
    'S001': 'present',
    'S002': 'present',
    'S003': 'absent',
    'S004': 'present',
    'S005': 'present',
    'S006': 'present',
    'S007': 'absent',
    'S008': 'present'
  },
};
const AttendanceCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [attendanceData, setAttendanceData] = useState(initialAttendance);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const getListData = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    const dayAttendance = attendanceData[dateString];
    let listData = [];
    if (dayAttendance) {
      students.forEach(student => {
        const status = dayAttendance[student.rollNo];
        if (status) {
          listData.push({
            type: status === 'present' ? 'success' : 'error',
            content: `${student.name} - ${status.charAt(0).toUpperCase() + status.slice(1)}`,
          });
        }
      });
    }
    return listData;
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') {
      const listData = getListData(current);
      return (
        <ul className="events">
          {listData.map((item) => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    }
    return info.originNode;
  };
  const handleSelectDate = (value) => {
    setSelectedDate(value);
    showModal();
  };
  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      date: selectedDate,
      attendance: students.map(student => ({
        rollNo: student.rollNo,
        status: attendanceData[selectedDate.format('YYYY-MM-DD')]?.[student.rollNo] || 'present'
      }))
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const dateKey = values.date.format('YYYY-MM-DD');
      const updatedAttendanceForDate = { ...attendanceData[dateKey] };

      values.attendance.forEach(att => {
        updatedAttendanceForDate[att.rollNo] = att.status;
      });

      setAttendanceData({
        ...attendanceData,
        [dateKey]: updatedAttendanceForDate,
      });
      setIsModalVisible(false);
      notification.success({
        message: 'Attendance Saved',
        description: `Attendance for ${dateKey} has been updated.`,
      });
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ marginBottom: 0 }}>Attendance Overview</h2>
        <p>Click on a date to mark/view attendance.</p>
      </div>
      <Calendar onSelect={handleSelectDate} cellRender={cellRender} />

      <Modal
        title={`Attendance for ${selectedDate.format('YYYY-MM-DD')}`}
        open={isModalVisible} 
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
      >
        <Form form={form} layout="vertical" name="attendance_form">
          <Form.Item name="date" label="Date">
            <DatePicker disabled />
          </Form.Item>
          {students.map((student, index) => (
            <Form.Item
              key={student.id}
              label={student.name}
              style={{ marginBottom: 10 }}
            >
              <Form.Item
                name={['attendance', index, 'rollNo']}
                initialValue={student.rollNo}
                hidden
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['attendance', index, 'status']}
                initialValue={attendanceData[selectedDate.format('YYYY-MM-DD')]?.[student.rollNo] || 'present'}
                noStyle
              >
                <Select style={{ width: 120 }}>
                  <Option value="present">Present</Option>
                  <Option value="absent">Absent</Option>
                  <Option value="late">Late</Option>
                  <Option value="excused">Excused</Option>
                </Select>
              </Form.Item>
            </Form.Item>
          ))}
        </Form>
      </Modal>
    </>
  );
};

export default AttendanceCalendar;