import "./Button.css";

function Button(props) {
  return (
    <input type="button" value={props.text} className="btn"/>
  );
}

export default Button;