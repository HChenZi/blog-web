import {Button, Card, Form, Input, message} from "antd";
import {postInit} from "../api";
import {history} from "../utils/history";

const Init = () => {
    const onFinish = (values) => {
        postInit(values).then(res => {
            message.success(res.message);
            history.push('/');
        }).catch(err => {
            message.error(err.message);
            history.push('/');
        });
    };

    return (<div style={{margin: "10vh auto", width: "80vh"}}>
            <Card title="初始化">
                <p>
                    初始化数据库，包括用户、站点配置。
                </p>
                <Form
                    name="basic"
                    labelCol={{span: 6}}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{
                            required: true, message: '请输入用户名',
                        },]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{
                            required: true, message: '请输入密码!',
                        },]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="站点标题"
                        name="title"
                        rules={[{
                            required: true, message: '请输入站点标题',
                        },]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>);
}
export default Init;