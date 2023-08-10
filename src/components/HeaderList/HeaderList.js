import "./HeaderList.css";

import { Link } from "react-router-dom";

function HeaderList(props) {
   return (
      <li className={(props.active) ? "headerlist active" : "headerlist"}>
         <Link to={{ pathname: props.action }}>
            <span>
               <b>
                  {props.title}
               </b>
            </span>
         </Link>
      </li>
   );
}

export default HeaderList;