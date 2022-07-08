import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {reqCategories} from "../../api";
import Nav from "../../component/nav";
import "../public.css"

const Home = () => {
    const [menu, setMenu] = React.useState([]);
    useEffect(() => {
        reqCategories().then(res => {
            setMenu([...res, "admin"])
        });
        localStorage.clear();
    }, []);

    return (<>
            <Nav menu={menu}/>
            <Outlet/>
        </>);
}

export default Home;
