
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
// import useScreenSize from "../../hooks/useScreenSize";
import { API } from "../constant";
import { setToken } from "../helpers";

// const getRoleLog  = (ctx, next) {

//   const { id } = ctx.params;

//   return await strapi.query("plugin::users-permissions.user").findOne({

//     where: { id },

//     populate: ["role"],

//   });

// }

const Login = () => {
  // const { isDesktopView } = useScreenSize();
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
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome back ${data.user.username}!`);

        console.log(data)

        const token = data.jwt;

        // Request API.
        axios
          .get('http://localhost:1337/api/users-permissions/roles/:id', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(response => {
            // Handle success.
            console.log('Data: ', response.data);
          })
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
          });
        ///////////////////////////////// POPULATE POPULATE //////////////////////////////////////
        ///////////////////////////////// RELATIÇON AVEC LES TABLES //////////////////////////////
        ///////////////////////////////// POPULATE POPULATE //////////////////////////////////////

        // axios.get(`${API/}/plugin::users-permissions.user`)
        // module.exports = {
        //   register ({ strapi }) {
        //     strapi.service('plugin::users-permissions.user').fetchAuthenticatedUser = (id) => {
        //       return strapi
        //         .query('plugin::users-permissions.user')
        //         .findOne({ where: { id }, populate: ['role', 'teams.avatar'] })
        //     }
        //   }
        // }

        // const userRole = axios.get(`${API}/users-permissions/roles/:id`,{
        //   id: data.user.id  
        // });
        // const dataa = await userRole.json();
        // console.log(dataa)

        // const isRole = await fetch(`${API}/users-permissions/roles`, {
        //   method: "GET",
        // })
        // const toto = await isRole.json();
        // console.log(toto)
        // navigate("/reservation", { replace: true });
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
        <Card title="SignIn">
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
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
          >
            <Form.Item
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
                label="Password"
                name="password"
                rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                  type="primary"
                  htmlType="submit"
                  className="login_submit_btn"
              >
                Login {isLoading && <Spin size="small" />}
              </Button>
            </Form.Item>
          </Form>
          <Typography.Paragraph className="form_help_text">
            New to Social Cards? <Link to="/signup">Sign Up</Link>
          </Typography.Paragraph>
        </Card>
      </Fragment>
  );
};

export default Login;