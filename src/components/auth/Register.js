import React from 'react'
import { connect } from 'react-redux'
import { REGISTER_QUERY } from '../../queries';
import { useMutation } from '@apollo/client';


const Register = (props) => {
  
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_QUERY);
  const [success, setMessage] = React.useState('');
  const [email_error, setEmailErrors] = React.useState([]);
  const [username_error, setUsernameErrors] = React.useState([]);
  const [password_error, setPassErrors] = React.useState([]);
  const handleRegister = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password1 = e.target.password1.value;
    const password2 = e.target.password2.value;
    const email = e.target.email.value;

    registerUser({
      variables: {
        email: email,
        password1: password1,
        password2: password2,
        username: username
      }
    }).then(res => { 
      if (res.data.register.success) {
        setMessage("you have been registed")
        
      } else {
        if (res.data.register.errors.email) {
          console.log(res.data.register.errors.email)
          setEmailErrors(res.data.register.errors.email)
        }
        if (res.data.register.errors.username) {
          setUsernameErrors(res.data.register.errors.username)
        }
        if (res.data.register.errors.password) {
          setPassErrors(res.data.register.errors.password)
        }
      }
    })
  }
  return (
    <div className='py-20 max-w-screen-sm m-auto'>
          <form onSubmit={handleRegister} className="flex flex-col space-y-10">
        <h2>Register</h2>
        {success}
        <input type={"text"} name="username"
          className="px-5 py-2 border" placeholder={"username"} />
        {
          username_error.map(error =>
            <div className="text-red-500" key={error.code}>{error.message}</div>
          )
        }
        <input type={"email"} name="email"
          className="px-5 py-2 border" placeholder={"email"} />
        {
          email_error.map(error =>
            <div className="text-red-500" key={error.code}>{error.message}</div>
          )
        }
        <input type={"password"} name="password1"
          className="px-5 py-2 border" placeholder={"password"} />
        {
          password_error.map(error =>
            <div className="text-red-500" key={error.code}>{error.message}</div>
          )
        }
        <input type={"password"} name="password2"
          className="px-5 py-2 border" placeholder={"confirm password"} />
              <button className='border py-2 bg-blue-600 text-white'>Register</button>
    
      </form>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Register)