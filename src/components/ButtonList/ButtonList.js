import "./ButtonList.css";

import { ButtonWithIcon } from "..";

function ButtonList(props) {
   return (
      <li className="buttonlist">
         <ButtonWithIcon text={props.text} hook={props.action} />
      </li>
   );
}

export default ButtonList;