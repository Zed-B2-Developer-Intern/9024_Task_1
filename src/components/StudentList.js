'use client';
import React, { useState } from 'react';
import { Table, Input, Button, Space, Modal, Form, Select, App } from 'antd'; // Import App here
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Option } = Select;
const initialStudents = [
    {
      id: '1',
      name: 'Alice Johnson',
      rollNo: 'S001',
      grade: '10',
      contact: 'alice@example.com',
    },
    {
      id: '2',
      name: 'Bob Williams',
      rollNo: 'S002',
      grade: '9',
      contact: 'bob@example.com',
    },
    {
      id: '3',
      name: 'Charlie Brown',
      rollNo: 'S003',
      grade: '11',
      contact: 'charlie@example.com',
    },
    {
      id: '4',
      name: 'Diana Prince',
      rollNo: 'S004',
      grade: '10',
      contact: 'diana@example.com',
    },
    {
      id: '5',
      name: 'Diana',
      rollNo: 'S005',
      grade: '8',
      contact: 'dian@example.com',
    },
    {
      id: '6',
      name: 'stalin',
      rollNo: 'S006',
      grade: '5',
      contact: 'sta@example.com',
    },
    {
      id: '7',
      name: 'mk',
      rollNo: 'S007',
      grade: '12',
      contact: 'mk@example.com',
    },
    {
      id: '8',
      name: 'john',
      rollNo: 'S008',
      grade: '10',
      contact: 'john@example.com',
    },
  ];

  const StudentList = () => {
    const [students, setStudents] = useState(initialStudents);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [form] = Form.useForm();
    const { modal, notification } = App.useApp();
    const handleSearch = (value) => {
      setSearchText(value);
      const filteredStudents = initialStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.rollNo.toLowerCase().includes(value.toLowerCase())
      );
      setStudents(filteredStudents);
    };
    const showModal = (student = null) => {
      setEditingStudent(student);
      setIsModalVisible(true);
      if (student) {
        form.setFieldsValue(student);
      } else {
        form.resetFields();
      }
    };
    const handleOk = () => {
      form
        .validateFields()
        .then((values) => {
          if (editingStudent) {
            setStudents(
              students.map((s) =>
                s.id === editingStudent.id ? { ...s, ...values } : s
              )
            );
            notification.success({
              message: 'Student Updated',
              description: `${values.name} has been updated successfully.`,
            });
          } else {
            const newId = (parseInt(students[students.length - 1].id) + 1).toString();
            setStudents([...students, { id: newId, ...values }]);
            notification.success({
              message: 'Student Added',
              description: `${values.name} has been added successfully.`,
            });
          }
          setIsModalVisible(false);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    };
    const handleDelete = (id) => {
      modal.confirm({
        title: 'Are you sure you want to delete this student?',
        content: 'This action cannot be undone.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          setStudents(students.filter((student) => student.id !== id));
          notification.success({
            message: 'Student Deleted',
            description: 'The student has been deleted successfully.',
          });
        },
      });
    };

    const columns = [
      {
        title: 'Roll No',
        dataIndex: 'rollNo',
        key: 'rollNo',
        sorter: (a, b) => a.rollNo.localeCompare(b.rollNo),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
      },
      {
        title: 'Grade',
        dataIndex: 'grade',
        key: 'grade',
        filters: Array.from(new Set(initialStudents.map(s => s.grade))).map(grade => ({ text: grade, value: grade })),
        onFilter: (value, record) => record.grade.indexOf(value) === 0,
        sorter: (a, b) => a.grade.localeCompare(b.grade),
      },
      {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
              Edit
            </Button>
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
              Delete
            </Button>
          </Space>
        ),
      },
    ];

    return (
      <>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Search
            placeholder="Search by name or roll number"
            onSearch={handleSearch}
            style={{ width: 300 }}
            enterButton={<SearchOutlined />}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Add New Student
          </Button>
        </div>
        <Table columns={columns} dataSource={students} rowKey="id" pagination={{ pageSize: 10 }} />

        <Modal
          title={editingStudent ? 'Edit Student' : 'Add New Student'}
          open={isModalVisible}
          onOk={handleOk}
          onCancel={() => setIsModalVisible(false)}
          okText={editingStudent ? 'Update' : 'Add'}
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical" name="student_form">
            <Form.Item
              name="name"
              label="Student Name"
              rules={[{ required: true, message: 'Please enter student name!' }]}
            >
              <Input placeholder="e.g., John Doe" />
            </Form.Item>
            <Form.Item
              name="rollNo"
              label="Roll Number"
              rules={[{ required: true, message: 'Please enter roll number!' }]}
            >
              <Input placeholder="e.g., S005" />
            </Form.Item>
            <Form.Item
              name="grade"
              label="Grade"
              rules={[{ required: true, message: 'Please select grade!' }]}
            >
              <Select placeholder="Select grade">
                <Option value="9">Grade 9</Option>
                <Option value="10">Grade 10</Option>
                <Option value="11">Grade 11</Option>
                <Option value="12">Grade 12</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="contact"
              label="Contact Email"
              rules={[{ type: 'email', message: 'Please enter a valid email!' }]}
            >
              <Input placeholder="e.g., john.doe@example.com" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
  export default StudentList;