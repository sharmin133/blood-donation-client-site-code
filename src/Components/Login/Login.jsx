
import React, { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../context/AuthContext';

const Login = () => {


  const emailRef=useRef()
 const[showPassword,setSowPassword]=useState(false)
  const[errorMessage,setErrorMessage]=useState(false);
   const[successMessage,setSuccessMessage]=useState('')

   const{userLogin}=useContext(AuthContext)
   const loginNavigate=useNavigate();
   const location=useLocation()
    const from = location.state?.from || '/'; 

    const handleLogIn=(e)=>{
        e.preventDefault();

        const email=e.target.email.value;
        const password=e.target.password.value 
        setSuccessMessage(false)
               setErrorMessage('')

               const passwordRegExp=/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
if(passwordRegExp.test(password)===false){
  setErrorMessage('Password must have one lowercase,one uppercase and 6 character or longer.')
  return;
}

        userLogin( email,password)
        .then(result=>{
            console.log(result.user)
            setSuccessMessage(true)
            toast.success('User login successful.', {
        onClose: () => loginNavigate(from, { replace: true })
      });
        })
        .catch(error=>{
            // console.log(error)
            setErrorMessage(error.message)
            toast.error(error.message);
             
        })

       
     }



  
    
    return (
      <div className=' py-10'>
       

        <ToastContainer position="top-center" autoClose={3000} />
          <div className="card bg-base-100 mx-auto mt-20 mb-20 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
            <h1 className="text-5xl font-bold text-violet-700">Login now!</h1>
              <form onSubmit={handleLogIn} className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input" name='email' ref={emailRef} placeholder="Email" />
                <label className="label">Password</label>
                 <div className='relative'>
                                        <input type={showPassword?'text':'password'} className="input" name='password' placeholder="Password" autoComplete="current-password" />
                                        <button onClick={()=>{setSowPassword(!showPassword)}} className='btn btn-xs absolute top-2 right-6'>
                                          {
                                          showPassword?<FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
                                          }
                                          
                                          </button>
                                       </div>
               
                <button className="btn btn-neutral mt-4 bg-blue-600 text-white ">Login</button>
              </form>
                 {

                      errorMessage && <p className='text-red-600'>{errorMessage}</p>
                     }

                     {
                      successMessage && <p className='text-green-600'>User login successfully.</p>
                     }
              <p> New to this site. please <Link className='text-blue-600 underline' to='/register'>Register</Link> </p>
            </div>
          </div>
      </div>
    );
};

export default Login;
