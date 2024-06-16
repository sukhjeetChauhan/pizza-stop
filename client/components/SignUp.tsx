import { useState } from 'react'
import { signUp } from '../../src/authentication.ts'
import { Form, Input, Button, message } from 'antd'
// import { addData, getData } from '../../src/db.ts'
import { addUser } from '../../src/authentication.ts'
import { useNavigate } from 'react-router-dom'
import Spinner from '../utils/Spinner.tsx'

interface RegisterData {
  name: string
  email: string
  password: string
  address: string
  number: string
}

const RegistrationForm = () => {
  const [form] = Form.useForm()
  const [isHovered, setIsHovered] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (values: RegisterData) => {
    try {
      console.log('Received values of form: ', values)
      const data = {
        name: values.name,
        email: values.email,
        address: values.address,
        phone: values.number,
      }
      setLoading(true) // Show the spinne
      // Sign up the user
      const output = (await signUp(
        values.email,
        values.password
      )) as unknown as string

      if (output === 'success') {
        // Wait for 3 seconds
        await new Promise((resolve) => setTimeout(resolve, 3000))

        // Add user data
        await addUser(data)
        setLoading(false) // Hide the spinner
        message.success('Registration successful!')
        navigate('/')
      } else {
        message.error(output)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 48 },
      sm: { span: 9 },
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
    navigate('/login')
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-20 bg-[url('/images/marble-back.jpeg')] bg-repeat min-h-screen">
      {loading && <Spinner />}
      <div className="p-6 md:p-12 bg-gray-100  w-[20rem] md:w-[35rem] rounded shadow-lg mt-20">
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={handleRegister}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label={
              <label
                style={{
                  color: '#F44336',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                Full Name
              </label>
            }
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
            hasFeedback
          >
            <Input style={{ width: '90%' }} />
          </Form.Item>
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
                E-mail
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
            <Input style={{ width: '90%' }} />
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
              {
                min: 6,
                message: 'Password must be at least 6 characters!',
              },
            ]}
            hasFeedback
          >
            <Input.Password style={{ width: '90%' }} />
          </Form.Item>

          <Form.Item
            name="address"
            label={
              <label
                style={{
                  color: '#F44336',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                Address
              </label>
            }
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              },
            ]}
          >
            <Input.TextArea style={{ width: '90%' }} />
          </Form.Item>
          <Form.Item
            name="number"
            label={
              <label
                style={{
                  color: '#F44336',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                }}
              >
                Phone No
              </label>
            }
            rules={[
              {
                required: true,
                message: 'Please input your Phone Number!',
              },
            ]}
            hasFeedback
          >
            <Input style={{ width: '90%' }} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              className="bg-limeGreen text-xl w-52 h-auto"
              type="primary"
              htmlType="submit"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor: isHovered ? '#84cc16' : '#70a401', // Change colors as per your need
              }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex items-center justify-center gap-4">
        <p>Already registered? Click here to Login</p>
        <Button className="bg-limeGreen text-white" onClick={() => setLogin()}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default RegistrationForm
