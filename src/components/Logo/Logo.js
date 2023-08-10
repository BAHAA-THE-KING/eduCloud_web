import "./Logo.css";

import { Link } from "react-router-dom";

import { HOME } from "../../handlers";

function Logo() {
   return <Link to={{ pathname: HOME }}><div className="logo">EduCloud</div></Link>;
}

export default Logo;