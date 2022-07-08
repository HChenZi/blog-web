import Nav from "../../component/nav";
import {Outlet} from "react-router-dom";
import React, {useEffect} from "react";
import {history} from "../../utils/history";
import "../public.css"

const Admin = () => {
    const menu = ["site", "articles", "addArticle", "/"];
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            history.replace('/login')
        }
    })
    return (<>
        <Nav menu={menu}/>
        <Outlet/>
    </>);
}
export default Admin;