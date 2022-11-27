import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../constant";
import { setToken } from "../helpers";
import "../login/login.css";

const Login = () => {

  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {

        setToken(data.jwt);
        setUser(data.user);
        // console.log(data.user);

        message.success(`Welcome back ${data.user.username}!`);

        const token = data.jwt;
        const idUser = data.user.id;

        const responseRole = axios.get(`${API}/users/me?populate=*`,{
          headers: {
            Authorization: `Bearer ${token}`,//  when user login there will be a jwt in reponse so you can pass user jwt in here 
          }
        });

        const dataRole = await responseRole;

        if (dataRole?.error) {

          throw data?.error
        } else if(dataRole.data.role.name == "utilisateur"){
          navigate("/reservation");
          // console.log('first')
        } else if (dataRole.data.role.name == "admin"){
          navigate("/admin");
        } else {  
          console.log(dataRole)
        }

      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <Fragment>
        <Card title="Connexion">
          {error ? (
              <Alert
                  className="alert_error"
                  message={error}
                  type="error"
                  closable
                  afterClose={() => setError("")}
              />
          ) : null}
          <Form
          className="form-connexion"
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
          >
            <Form.Item
                label="Email"
                name="email"
                className="input-connexion"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
            >
              <Input placeholder="Email address" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                className="input-password"
                rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                  type="primary"
                  htmlType="submit"
                  className="button-connexion"
              >
                Login {isLoading && <Spin size="small" />}
              </Button>
            </Form.Item>
          </Form>
          <Typography.Paragraph className="form_help_text">
            Pas de compte ? <Link to="/inscription">inscription</Link>
          </Typography.Paragraph>
        </Card>
      </Fragment>
  );
};

export default Login;