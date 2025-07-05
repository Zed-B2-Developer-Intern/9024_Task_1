'use client';
import { Calendar, Select, Radio, Row, Col } from 'antd';
import moment from 'moment';
const CalendarPage = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(localeData.monthsShort(value.clone().month(i)));
    }
    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {months[i]}
        </Select.Option>,
      );
    }
    const year = value.year();
    const month = value.month();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>,
      );
    }
    return (
      <div style={{ padding: 8 }}>
        <Row gutter={8} align="middle" justify="space-between">
          <Col>
            <Select
              size="small"
              popupMatchSelectWidth={false}
              className="my-year-select"
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
              value={String(year)}
            >
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              size="small"
              popupMatchSelectWidth={false}
              value={month}
              onChange={(newMonth) => {
                const now = value.clone().month(Number(newMonth));
                onChange(now);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <>
      <h1 style={{ marginBottom: 24 }}>School Calendar</h1>
      <div style={{ border: '1px solid #f0f0f0', borderRadius: 8 }}>
        <Calendar headerRender={headerRender} onPanelChange={onPanelChange} />
      </div>
    </>
  );
};
export default CalendarPage;