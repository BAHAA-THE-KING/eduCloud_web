import "./ButtonList.css";

import { ButtonWithIcon } from "..";
import { Link } from "react-router-dom";

function ButtonList(props) {
   return (
      <li className="buttonlist">
         <Link to={{ pathname: props.action }}>
            <ButtonWithIcon text={props.text} hook={() => { }} src={props.src} />
         </Link>
      </li>
   );
}

export default ButtonList;