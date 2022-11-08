
import React from "react";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useAuthContext } from "../../context/AuthContext";
import { API } from "../constant";
import { useState } from "react";
import { getToken } from "../helpers";

const Profile = () => {
    const [loading, setLoading] = useState(false);
    const { user, isLoading, setUser } = useAuthContext();

    const handleProfileUpdate = async (data) => {
        setLoading(true);
        try {
            const response = await fetch(`${API}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // set the auth token to the user's jwt
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();

            setUser(responseData);
            message.success("Profil modifier !");
        } catch (error) {
            console.error(Error);
            message.error("Erreur !");
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return <Spin size="large" />;
    }

    return (
        <Card className="profile_page_card">
            <Form
                layout="vertical"
                initialValues={{
                    username: user?.username,
                    email: user?.email,
                }}
                onFinish={handleProfileUpdate}
            >
                <Col md={8} lg={8} sm={24} xs={24}>
                    <Form.Item
                        label="Nom d'utilisateur"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Nom d'utilisateur requis !",
                                type: "string",
                            },
                        ]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                </Col>
                <Col md={8} lg={8} sm={24} xs={24}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Email requis!",
                                type: "email",
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                </Col>

                <Button
                    className="profile_save_btn"
                    htmlType="submit"
                    type="primary"
                    size="large"
                >
                    {loading ? (
                        <>
                            <Spin size="small" /> Saving
                        </>
                    ) : (
                        "Envoi"
                    )}
                </Button>
            </Form>
        </Card>
    );
};

export default Profile;