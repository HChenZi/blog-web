import {Button, message, Popconfirm, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {delArticle, reqArticles} from "../../api";
import {Link} from "react-router-dom";

const ArticlesManager = () => {

    const deleteOnclick = (title) => {
        delArticle(title).then(res => {
            message.success(res.message);
            // eslint-disable-next-line no-restricted-globals
            location.reload(true);
        });
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        reqArticles("", {details: 1}).then((res) => {
            setData(res.data);
        })
    }, [])

    const columns = [{
        title: '文章标题', content: "title", dataIndex: "title", key: "title"
    },

        {
            title: '分类', content: "category", dataIndex: "category", key: "category"
        }, {
            title: '发布时间', content: "created_at", dataIndex: "created_at", key: "created_at"
        }, {
            title: '更新时间', content: "updated_at", dataIndex: "updated_at", key: "updated_at"
        }, {
            title: '评论数', content: "num_comments", dataIndex: "num_comments", key: "num_comments"
        }, {
            title: '阅读量', content: "views", dataIndex: "views", key: "views",
        }, {
            title: '操作', key: 'action', render: (value) => <Space>
                <Button>{value.title && <Link to={`/admin/editArticle/${value.title}`}>修改</Link>}</Button>
                <Popconfirm title={`确定要删除${value.title}吗？`}
                            onConfirm={() => deleteOnclick(value.title)}
                >
                    <Button danger>删除</Button>
                </Popconfirm>
            </Space>
        }]
    return <>
        <main>
            {/*<Table columns={columns} dataSource={data.length === 0 ? null : data}/>*/}
            <Table columns={columns} dataSource={data}/>
        </main>
    </>;
}

export default ArticlesManager;