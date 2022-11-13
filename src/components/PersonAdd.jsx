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

import React from 'react';
import axios from 'axios';
import { Fragment, useState } from "react";
import { setToken } from "./helpers";
import "../style/inscription.css";
import { useAuthContext } from "../context/AuthContext";
// import useScreenSize from "../../hooks/useScreenSize";
import { API } from "./constant";
// import { setToken } from "../../helpers";


const SignUp = () => {
  // const { isDesktopView } = useScreenSize();
  // const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data)
      if (data?.error) {
        console.log(data)
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Bienvenue ${data.user.username} !`);

        // navigate("/profile", { replace: true });
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
        <Row align="middle">
          <Col>
            <Card title="Inscription">
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
                  className="form-inscription"
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
              >
                <Form.Item
                    className="input-inscription"
                    label="Identifiant"
                    name="username"
                    rules={[
                      {
                        required: true,
                        type: "string",
                      },
                    ]}
                >
                  <Input placeholder="Identifiant" />
                </Form.Item>
                <Form.Item
                    className="input-inscription"
                    label="Email"
                    name="email"
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
                    className="input-inscription"
                    label="Mot de passe"
                    name="password"
                    rules={[{ required: true }]}
                >
                  <Input.Password placeholder="Mot de passe" />
                </Form.Item>

                <Form.Item>
                  <Button
                      type="primary"
                      htmlType="submit"
                      className="button-inscription"
                  >
                    Inscription {isLoading && <Spin size="small" />}
                  </Button>
                </Form.Item>
              </Form>
              <Typography.Paragraph className="form_help_text">
                {/* Already have an account? <Link to="/signin">Sign In</Link> */}
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      </Fragment>
  );
}

export default SignUp;