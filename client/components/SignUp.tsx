// import { useState } from 'react'
import { signUp } from '../../src/authentication.ts'
import { Form, Input, Button, message } from 'antd'
// import { addData, getData } from '../../src/db.ts'

const RegistrationForm = () => {
  const [form] = Form.useForm()

  const handleRegister = async (values: {
    email: string
    password: string
  }) => {
    // console.log('Received values of form: ', values)
    signUp(values.email, values.password)
    message.success('Registration successful!')
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
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

  function setLogin() {
    // SetRegistered(false)
  }

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <Button onClick={setLogin}>Login</Button>
      </div>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleRegister}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
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
          label="Password"
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
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegistrationForm
