import "./ButtonList.css";

import { Button } from "..";

function ButtonList(props) {
   return (
      <li className="buttonlist">
         <Button text={props.text} hook={props.action} />
         <img src="Icons/add.svg" alt="" />
      </li>
   );
}

export default ButtonList;