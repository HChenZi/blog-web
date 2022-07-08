import {Button, Form, Input, message, Space} from "antd";
import React from "react";
import {updatePassword, updateSiteName, updateUsername} from "../../api";

const SiteManager = (() => {
    const usernameOnFinish = (value) => {
        updateUsername(value).then((value) => message.success(value.message));
    }
    const passwordOnFinish = (value) => {
        updatePassword(value).then((value) => message.success(value.message));
    }
    const siteNameOnFinish = (value) => {
        updateSiteName(value).then((value) => message.success(value.message));
    }
    return (<main>
            <div className="main-container">
                <Space direction="vertical" align='center'>
                    <Form layout="inline" onFinish={usernameOnFinish}>
                        <Form.Item label="更改用户名" name="username">
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                    <Form layout="inline" onFinish={passwordOnFinish}>
                        <Form.Item label="更改密码" name="password">
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                    <Form layout="inline" onFinish={siteNameOnFinish}>
                        <Form.Item label="更改站点名称" name="name">
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Space>
            </div>
        </main>);
})

export default SiteManager;