import axios from "axios";
import {history} from "../utils/history";

const api = axios.create({
    baseURL:  "/api", timeout: 5000, headers: {
        'Content-Type': 'application/json', 'Accept': 'application/json',
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

api.interceptors.response.use((response) => {
    response.headers.authorization && localStorage.setItem('token', response.headers.authorization);
    return response.data;
}, (error) => {
    if (error.response.status === 401) {
        localStorage.removeItem('token');
        history.push('/login');
    }
    return Promise.reject(error);
});

//初始化
const postInit = (values) => {
    return api.post('/init', values).then(res => {
        return res;
    }).catch(err => {
        return err.response.data;
    });
}

const login = (values) => {
    return api.post('/login', values);
}

//根据分类，分页获取文章列表
const reqArticles = (category, details) => {
    if (details && details.details === 1) {
        return api.get(`/articles/?details=${details.details}`)
    } else {
        return api.get(`/articles/${category || ""}`);
    }

}
//获取分类列表
const reqCategories = () => {
    return api.get('/categories');
}

//获取文章详情
const reqArticle = (title) => {
    return api.get(`/article/${title}`);
}

//添加评论
const postComment = (data) => {
    return api.post("/comment", data);
}

//获取评论列表
const reqComments = (title) => {
    return api.get("comments/" + title);
}

//管理功能
//更改用户名
const updateUsername = (username) => {
    return api.put('/user', username);
}
//更改密码
const updatePassword = (password) => {
    return api.put('/user', password);
}
//更改站点名称
const updateSiteName = (name) => {
    return api.put('/config', name);
}
//添加文章
const postArticle = (data) => {
    return api.post('/article', data);
}
//删除文章
const delArticle = (title) => {
    return api.delete('/article/' + title);
}
//修改文章
const putArticle = (data) => {
    return api.put('/article/' + data.title, data);
}

export {
    postInit,
    login,
    reqArticles,
    reqCategories,
    reqArticle,
    updateUsername,
    updatePassword,
    updateSiteName,
    postArticle,
    delArticle,
    putArticle,
    postComment,
    reqComments
};