import "./Button.css";

function Button(props) {
  return (
    <input
      type="button"
      value={props.text}
      data-id={props.id ?? ""}
      className={"btn " + (props.className ?? "") + ((props.disabled) ? "  disabled" : "")}
      onClick={(!props.disabled) ? props.hook : () => { }}
    />
  );
}

export default Button;