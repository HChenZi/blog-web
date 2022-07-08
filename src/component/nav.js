import {useState} from "react";
import "./nav.css"
import {Link} from "react-router-dom";

const Nav = (props) => {
    const [menu, setMenu] = useState(props.menu);

    return (
        <div>
            <nav className="nav" id="navigation">
                <ul className="nav-list">
                    {props.menu.length !== 0 && props.menu.map(item => {
                        return (<li key={item}><Link to={item}>{item}</Link></li>);
                    })}
                </ul>
            </nav>
        </div>
        );
}


export default Nav;