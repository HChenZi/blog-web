import "./nav.css"
import {Link} from "react-router-dom";

const Nav = (props) => {
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