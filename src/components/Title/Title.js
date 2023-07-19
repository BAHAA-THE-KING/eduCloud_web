import "./Title.css";

function Title(props) {
   return (
      <span className="title">
         <b>{props.text}</b>
      </span>
   );
}

export default Title;