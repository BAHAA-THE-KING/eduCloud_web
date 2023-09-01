import "./PasswordInput.css";

function PasswordInput(props) {
   return (
      <div className='pass'>
         <input className='inppass' type={"password"} dir='rtl' placeholder='كلمة المرور' onChange={e => { props.hook(e.target.value) }} />
      </div>
   );
}

export default PasswordInput;