import React from 'react'
import { connect } from 'react-redux'
import * as auth from "../../store/actions/auth"
import { useMutation } from '@apollo/client';
import { LOGIN_QUERY } from '../../queries';
import {
  useNavigate
} from "react-router-dom";
const Login = (props) => {
  let navigate = useNavigate()
  const [loginUser] = useMutation(LOGIN_QUERY);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    loginUser({
      variables: {
        email: username,
        password: password
      }
    }).then(res => {
      if (res.data.tokenAuth.success) {
        props.finishAuth(res.data)
        navigate("/")
      }

    })
  }
  return (
    <div className='py-20 max-w-screen-sm m-auto'>
      <form onSubmit={handleLogin} className="flex flex-col space-y-10">
        <h2>Login</h2>
        <input type={"text"} className="px-5 py-2 border" name="username" placeholder={"username"} />
        <input type={"password"} className="px-5 py-2 border" name="password" placeholder={"password"} />
        <button className='border py-2 bg-blue-600 text-white'>login</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    finishAuth: (data) => dispatch(auth.finishAuth(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)