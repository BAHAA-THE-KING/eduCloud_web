import { useState } from "react";
import "./PasswordInput.css";

function PasswordInput(props) {
   const [type, setType] = useState("password");
   return (
      <div className='pass'>
         <input className='inppass' type={type} dir='rtl' placeholder='كلمة المرور' onChange={e => { props.hook(e.target.value) }} />
      </div>
   );
}

export default PasswordInput;