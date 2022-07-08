import {Button, Form, Input, message, Space} from "antd";
import React from "react";
import {history} from "../../utils/history";
import {login} from "../../api";

const Login = () => {
    const onFinish = (value) => {
        login(value).then((res) => {
            message.success(res.message);
            history.push('/admin/articles');

        }).catch((err) => {
            message.error(err.response.data.message)
        });

    }

    return (<main>
            <div className="main-container">
                <Space direction="vertical" align='center'>
                    <Form onFinish={onFinish}>
                        <Form.Item label="用户名" name="username" rules={[{"required": true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="密码" name="password" type="password" rules={[{"required": true}]}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </Space>
            </div>
        </main>)

}
export default Login;