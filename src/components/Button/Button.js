import "./Button.css";

function Button(props) {
  return (
    <input type="button" value={props.text} data-id={props.id??""} className="btn" onClick={props.hook}/>
  );
}

export default Button;