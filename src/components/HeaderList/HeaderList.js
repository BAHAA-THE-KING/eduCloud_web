import "./HeaderList.css";

function HeaderList(props) {
   return (
      <li className="headerlist">
         <span>
            <b>
               {props.title}
            </b>
         </span>
      </li>
   );
}

export default HeaderList;