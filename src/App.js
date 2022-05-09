import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import * as auth from "./store/actions/auth"
import { GET_USER } from './queries';
import { gql, useQuery } from '@apollo/client';
import { client } from '.';

const App = (props) => {
  useEffect(() => {
    client.query({
      query: GET_USER,
    }).then(res => { 
      props.setUser(res.data.me)
    })
  })
  return (
    <div className=' w-full m-auto max-w-screen-xl lg:mx-auto'>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home  {...props} />
            } />
          <Route
            exact
            path="/login"
            element={
              <Login  {...props} />
            } />
          <Route
            exact
            path="/register"
            element={
              <Register  {...props} />
            } />
        </Routes>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => dispatch(auth.userSuccess(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)