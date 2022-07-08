import {Button, Form, Input, message, Select, Space} from "antd";
import React, {useEffect, useState} from "react";
import MDEditer from "@uiw/react-md-editor"
import {postArticle, putArticle, reqArticle, reqCategories} from "../../api";
import {history} from "../../utils/history"
import {useParams} from "react-router-dom";

const AddArticle = (() => {
    const formRef = React.createRef();
    const params = useParams();
    useEffect(() => {
        if (params.article) {
            reqArticle(params.article).then(res => {
                formRef.current.setFieldsValue({
                    category: [res.data.category], content: res.data.content, title: res.data.title
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }, []);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        reqCategories().then(res => {
            const temp = [];
            res.forEach(value => {
                temp.push({label: value, value});
            })
            setCategories([...temp]);
        });
    }, [])

    const onFinish = (value) => {
        if (params.article && params.article === value.title) {
            putArticle({
                category: value.category[0], content: value.content, title: value.title
            }).then((res) => {
                message.success(res.message);
                history.push('/admin/articles')
            }).catch(err => message.error(err.response.data.message));
        } else {
            postArticle({
                category: value.category[0], content: value.content, title: value.title
            }).then((res) => {
                message.success(res.message);
                history.push('/admin/articles')
            }).catch(err => message.error(err.response.data.message));
        }
    }

    return (<main>
            <div className="main-container">
                <Space direction="vertical" align="center">
                    <Form onFinish={onFinish} ref={formRef}>
                        <Form.Item label="文章标题" name="title">
                            <Input/>
                        </Form.Item>
                        <Form.Item label="分类名" name="category">
                            <Select options={[...categories]} mode="tags" placeholder="目前仅支持单分类"/>
                        </Form.Item>
                        <Form.Item label="正文" name="content">
                            <MDEditer height="500" preview={"edit"}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Space>
            </div>
        </main>);
})

export default AddArticle