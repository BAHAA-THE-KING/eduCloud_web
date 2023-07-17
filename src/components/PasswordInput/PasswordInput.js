import { useState } from "react";
import "./PasswordInput.css";

function PasswordInput(props) {
   const [type, setType] = useState("password");
   return (
      <div className='pass'>
         <input className='inppass' type={type} dir='rtl' placeholder='كلمة المرور' onChange={e => { props.hook(e.target.value) }} />
         <img className="imgpass" src={(type === "password") ? "icons/eye off.svg" : "icons/eye on.svg"} alt="" onClick={
            () => {
               (type === "password") ? setType("text") : setType("password")
            }
         } />
      </div>
   );
}

export default PasswordInput;