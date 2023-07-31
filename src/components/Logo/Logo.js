import { HOME, goTo } from "../../handlers";
import "./Logo.css";

function Logo() {
   return <div className="logo" onClick={() => goTo(HOME)}>EduCloud</div>;
}

export default Logo;