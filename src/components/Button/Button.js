import "./Button.css";

function Button(props) {
  return (
    <input type="button" value={props.text} className="btn" onClick={props.hook}/>
  );
}

export default Button;