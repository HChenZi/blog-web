import React from "react";
import {Route, Routes, unstable_HistoryRouter as HistoryRouter} from "react-router-dom";
import 'antd/dist/antd.css';
import Home from "./pages/home";
import Articles from "./pages/home/articles";
import {history} from "./utils/history";
import Init from "./pages/init";
import Article from "./pages/home/article";
import Admin from "./pages/admin";
import SiteManager from "./pages/admin/site"
import ArticlesManager from "./pages/admin/articles"
import AddArticle from "./pages/admin/addarticle";
import Login from "./pages/admin/login";

const App = () => {
    return (<HistoryRouter history={history}>
            <Routes>
                <Route path="/" element={<Home/>}>
                    <Route index element={<Articles/>}/>
                    <Route path='/:category' element={<Articles/>}/>
                    <Route path='/article/:title' element={<Article/>}/>
                </Route>
                <Route path="/admin" element={<Admin/>}>
                    <Route path="site" element={<SiteManager/>}/>
                    <Route path="articles" element={<ArticlesManager/>}/>}
                    <Route path="addArticle" element={<AddArticle/>}/>
                    <Route path="editArticle/:article" element={<AddArticle/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path='/init' element={<Init/>}/>

            </Routes>
        </HistoryRouter>)
}
export default App;