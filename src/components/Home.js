import React from 'react'
import { connect } from 'react-redux'
import Message from './Message'
import SideBar from './SideBar'

const Home = (props) => {
  return (
    <div className='grid grid-cols-4'>
      <SideBar/>
      <div className='col-span-3'>
        <Message/>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Home)