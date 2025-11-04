import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = ({ notify }) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    notify.success({
      message: "Signup Successful",
      description: `Welcome ${values.username}!`,
    });
    toast.success("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card title="Signup" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form.Item>
          <Button type="link" onClick={() => navigate("/login")}>
            Already have an account? Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
