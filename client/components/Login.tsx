import { useState } from 'react'
import { Form, Input, Button, message, Checkbox } from 'antd'
import 'tailwindcss/tailwind.css' // Ensure Tailwind CSS is imported

const RegistrationForm = () => {
  const [form] = Form.useForm()
  const [isHovered, setIsHovered] = useState(false)

  const handleLogin = async (values) => {
    console.log('Received values of form: ', values)
    message.success('Registration successful!')
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-24">
      <div className="flex items-center justify-center gap-4">
        <Button onClick={() => {}}>Register</Button>
      </div>

      <div className="p-16 bg-gray-100 w-[30rem] rounded shadow-lg">
        <Form
          {...formItemLayout}
          initialValues={{
            remember: true,
          }}
          form={form}
          name="register"
          onFinish={handleLogin}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label={
              <label
                style={{
                  color: '#F44336',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                Email
              </label>
            }
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <label
                style={{
                  color: '#F44336',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                Password
              </label>
            }
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            {...tailFormItemLayout}
            name="remember"
            valuePropName="checked"
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              className="bg-limeGreen text-xl w-64 h-auto"
              type="primary"
              htmlType="submit"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor: isHovered ? '#84cc16' : '#70a401', // Change colors as per your need
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegistrationForm
