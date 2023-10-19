import React from "react";
import { FormOutlined, DiffOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

export const SIDEBAR_ITEMS: MenuProps["items"] = [
  {
    key: "1",
    icon: React.createElement(DiffOutlined),
    label: (
      <NavLink to="/">
        Bloglarım
      </NavLink>
    ),
  },
  {
    key: "2",
    icon: React.createElement(FormOutlined),
    label: (
      <NavLink to="/blog/add">
        Blog Ekle
      </NavLink>
    ),
  }
];
