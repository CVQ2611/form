import { Button } from "antd";
import { Link } from "react-router-dom";

function HeaderMenu({ button }) {
    return (
        <Button key={button.key} type='text'>
            <Link to={button.path}>{button.name}</Link>
        </Button>
    )
}

export default HeaderMenu;