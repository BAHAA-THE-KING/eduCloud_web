import "./HeaderList.css";

function HeaderList(props) {
   return (
      <li className={(props.active) ? "headerlist active" : "headerlist"}>
         <span>
            <b>
               {props.title}
            </b>
         </span>
      </li>
   );
}

export default HeaderList;