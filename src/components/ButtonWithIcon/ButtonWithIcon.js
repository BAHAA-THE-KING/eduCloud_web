import "./ButtonWithIcon.css";

import { Button } from "..";

function ButtonWithIcon(props) {
   return (
      <div className="iconbutton">
         <Button text={props.text} id={props.id} hook={props.hook} />
         <img src={props.src ?? "logo512.png"} alt="" />
      </div>
   );
}

export default ButtonWithIcon;