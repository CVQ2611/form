import { Button } from "antd";
import { Link } from "react-router-dom";

function MoreButton({ idUsers }) {


    return (
        <Button >
            <Link to={`/users/${idUsers}`}>more</Link>
        </Button>
    )
}

export default MoreButton;