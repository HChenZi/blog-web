import {useEffect, useState} from "react";
import {postComment, reqArticle, reqComments} from "../../api";
import {useParams} from "react-router-dom";
import MarkNav from "markdown-navbar"
import "./article.css"
import {Button, Comment, Form, Input, List, message} from "antd";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import ReactMarkdown from "react-markdown";

const Article = (props) => {
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const params = useParams();

    useEffect(() => {
        reqArticle(params.title).then(res => {
            setArticle(res.data);
            reqComments(res.data.title).then(res => {
                setComments(res.data);
            });
        });
    }, [])
    //评论列表
    const CommentList = ({comments}) => (<>
            <h2>评论列表</h2>
            <List
                dataSource={comments}
                itemLayout="horizontal"
                renderItem={(comment) => <Comment author={comment.comment_author} content={comment.content}
                                                  datetime={moment(comment.created_at).fromNow()}/>}
            />
        </>

    );
    //编辑评论
    const Editor = () => {
        const onFinish = ((value) => {
            value.title = article.title;
            postComment(value).then(res => {
                message.success(res.message);
                setComments([...comments, value])
            })
        })
        return (<Form onFinish={onFinish}>
                <h2>添加新评论</h2>
                <Form.Item rules={[{required: true}]} name="comment_author" label="称呼(必填)">
                    <Input/>
                </Form.Item>
                <Form.Item rules={[{required: true}]} name="content">
                    <TextArea rows={6} placeholder="在这里输入你的评论..."/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">提交评论</Button>
                </Form.Item>
            </Form>)
    };
    return (<>
            <main>
                <div className="flex-wrap">
                    <div className="main-container">
                        <ReactMarkdown>{article && article.content}</ReactMarkdown>
                        <div>
                            <Comment
                                content={<Editor/>}
                            />
                            {comments && comments.length > 0 && <CommentList comments={comments}/>}

                        </div>
                    </div>
                    <div className="toc-container">
                        {article && <MarkNav source={article.content} ordered={false} declarative></MarkNav>}
                    </div>
                </div>
            </main>
        </>)
}

export default Article;