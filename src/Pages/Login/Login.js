import './Login.css';
import { PasswordInput, TextInput, Logo } from '../../components';
import { useState } from 'react';

import * as handler from './../../handlers';

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login">
      <img src='Images/login.jpg' alt='' className='bg' />
      <div className="middle">
        <Logo />
        <form>
          <div className='hello'>مرحبا بك</div>
          <TextInput defaultValue={name} inputHook={setName} enterHook={() => { }} type="user name" hint="اسم المستخدم" />
          <PasswordInput hook={setPassword} />
          <input className='sbmt' type='button' onClick={e => { e.preventDefault(); handler.logIn(name, password); }} value={"تسجيل الدخول"} />
        </form>
      </div>
    </div>
  );
}

export default Login;
