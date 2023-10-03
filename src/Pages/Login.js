import { Input } from '../components';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import * as handlers from '../handlers';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <img src='Images/login.jpg' alt='' className='bg' />
      <div className="middle">
        <form>
          <div className="d-flex justify-content-center align-items-center mt-4">
            <span className='fs-3 text-light ms-2'>cloud</span>
            <FontAwesomeIcon icon={faDoorOpen} className="fs-3 text-light" />
            <span className='fs-3 text-light me-2'>Edu</span>
          </div>
          <Input defaultValue={name} inputHook={setName} enterHook={() => { }} type="text" hint="اسم المستخدم" />
          <Input defaultValue={password} inputHook={setPassword} enterHook={() => { }} type="password" hint="كلمة المرور" />
          <button
            className="sbmt-holder"
            onClick={
            e => {
              e.preventDefault();
              handlers.logIn(
                name,
                password,
                new AbortController(),
                data => { 
                  localStorage.setItem("auth", JSON.stringify(data));
                  navigate(handlers.HOME);
                },
                error => {
                  Swal.fire(error)
                },
                () => {

                }
              );
            }}>
            <div className='sbmt'>دخول</div>
            <FontAwesomeIcon icon={faUser} className="fs-5 icon" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
