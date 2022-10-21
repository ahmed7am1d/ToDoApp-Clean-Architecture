import React from "react";
import "./overview.scss";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Col, Dropdown, Menu, Row, Space } from "antd";
import { PlusOutlined, PushpinOutlined } from "@ant-design/icons";

const Overview = () => {
  const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">This week</a>,
          key: "0",
        },
        {
          label: <a href="https://www.aliyun.com">This month</a>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "Daily tasks",
          key: "3",
        },
      ]}
    />
  );

  return (
    <div className="overview-wrapper">
      {/* Header title */}
      <div className="header-wrapper">
        <h2 className="pageTitle">Task's overview</h2>
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          className="ant-dropdown-tasksDate"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Date
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      {/* Content */}
      <div className="tasks-overview-wrapper">
        {/* To Do container */}
        <div className="addTask-container">
          <div className="innertask-container-header">
            <div className="title">
              <h3>To Do</h3>
              <p className="counter">7</p>
            </div>
            <div className="innertask-headerContainer-button-container">
              <button className="addTaskButton">
                <PlusOutlined className="addButtonIcon" />
              </button>
            </div>
          </div>
          {/* task item */}
          <div className="task-item-container">
            <div className="header-container">
              <h4> • Learn Petrl</h4>
              <PushpinOutlined className="pinIcon"/>
            </div>
            <div className="task-description-container">
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse porro dolores quia nam soluta consequuntur saepe recusandae mollitia error rerum impedit maxime aliquam, sed minus doloribus sit quaerat quam necessitatibus.</p>
            </div>
            <div className="task-overduedate-container"></div>
            <div className="task-priority-container"></div>
          </div>
        </div>

        {/* In Progress container */}
        <div className="todayTasks-container">
          {" "}
          <div className="innertask-container-header">
            <div className="title">
              <h3>In Progress</h3>
              <p className="counter">7</p>
            </div>
            <div className="innertask-headerContainer-button-container">
              <button className="addTaskButton">
                <PlusOutlined className="addButtonIcon" />
              </button>
            </div>
          </div>
        </div>

        {/* Done container */}
        <div className="tomorrowTasks-container">
          {" "}
          <div className="innertask-container-header">
            <div className="title">
              <h3>Done</h3>
              <p className="counter">7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
