import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Badge } from "antd";
import "../index.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";



const { Sider } = Layout;



const Sidebar = () => {
  

  return (
    <div style={{ backgroundColor: "#283046", }}>
      <Sider
        style={{ backgroundColor: "#283046", color: "white"  }}
        breakpoint="lg"
      collapsedWidth="0"
      

      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          style={{
            backgroundColor: "#283046",
            color: "#d0d2d6",
            border: "none",
            position:"fixed",
            width: "200px"
          }}
          defaultSelectedKeys={["1"]}
          mode="inline"
        >
          
          <Menu.ItemGroup className="menu-heading" title={
    <>
      <span className="category-name">Feed</span>
    </>
  }>
            <Menu.Item icon={<Icon icon="feather-mail" height={20} />} key="1">
            <Link className="link" to="/movies">Movies</Link>
            </Menu.Item>
            <Menu.Item
              icon={<Icon icon="feather-message-square" height={20} />}
              key="2"
            >
              <Link className="link" to="/actors">Actors</Link>
            </Menu.Item>
            <Menu.Item
              icon={<Icon icon="feather-check-square" height={20} />}
              key="3"
            >
              <Link className="link" to="/dashboard/addmovie">Add Movie</Link>
            </Menu.Item>
            <Menu.Item
              icon={<Icon icon="feather-calendar" height={20} />}
              key="4"
            >
              <Link className="link" to="/dashboard/addactor">Add Actor</Link>
            </Menu.Item>
           
          </Menu.ItemGroup>
          <Menu.ItemGroup title={
    <>
      <span className="category-name">Your Profile</span>
    </>
  }>
            <Menu.Item icon={<Icon icon="feather-type" height={20} />} key="8">
            <Link className="link" to="/dashboard/profile">Update Profile</Link>    
            </Menu.Item>
            <Menu.Item icon={<Icon icon="feather-eye" height={20} />} key="9">
            <Link className="link" to="/dashboard/your-movies">Your Movies</Link>    
                    </Menu.Item>
            <Menu.Item icon={<Icon icon="feather-eye" height={20} />} key="10">
            <Link className="link" to="/dashboard/your-actors">Your Actors</Link>
            </Menu.Item>
            
            
          </Menu.ItemGroup>
        </Menu>
      </Sider>
    </div>
  );
};

export default Sidebar;
