import React from 'react'
import { connect } from 'react-redux'
import { useQuery } from '@apollo/client';
import { USER_CHATS } from '../queries';

const SideBar = (props) => {
  const { loading, error, data } = useQuery(USER_CHATS);
  const getParticipants = (participants) => {
    return participants.filter(participant => {
      if (props.user && parseInt(participant.id) !== props.user.pk) {
        return participant
      }
    })
  }
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return (
    <div className='col-span-1 flex flex-col h-screen bg-slate-100 justify-between'>
      <div className='pt-5 px-5 shadow pb-5'>
        <h1 className='text-4xl font-bold px-5 pb-10'>
          Glare
        </h1>
        <h2 className='text-2xl font-semibold py-4  px-5'>Messages</h2>
        <div className='w-full  relative  px-5'>
          <input placeholder='search people or message' type="text"
            className='rounded-full border bg-transparent py-2 pr-4 pl-8 w-full' />
          <svg xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6  absolute top-3 left-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      <div className='flex flex-col space-y-4 
      overflow-y-auto scrollbar-thumb-blue
       scrollbar-thumb-rounded scrollbar-track-blue-lighter
       scrollbar-w-2 scrolling-touch  h-full'>

        {
          data ?
            data.chats.edges.map(chat =>
              <div className='flex flex-col'>
                <div className='flex flex-row  items-center space-x-2  px-5 py-2 hover:bg-white cursor-pointer'>
                  <div className='rounded-full w-10'>
                    <img
                      src='https://avataaars.io/?avatarStyle=Transparent&topType=LongHairDreads&accessoriesType=Prescription01&hairColor=Red&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Gray01&eyeType=Squint&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Brown'
                      alt="username" />
                  </div>
                  <div className='flex flex-col w-full'>
                    <div className="flex flex-row text-sm justify-between 
                    items-center">
                      <div className='space-x-2'>
                        <span className='font-semibold '>
                          {getParticipants(chat.node.participants).length ? getParticipants(chat.node.participants)[0].first_name : ""}
                        </span>
                        <span className=''>@{getParticipants(chat.node.participants).length ? getParticipants(chat.node.participants)[0].username : ""}</span>
                      </div>
                      <span>{monthNames[new Date(chat.node.lastModified).getMonth()] + " "}
                        {new Date(chat.node.lastModified).getDate()}</span>
                    </div>
                    <span>
                      latest message here
                    </span>
                  </div>
                </div>
              </div>
            )
            :
            "loading"
        }


      </div>
      <div className='flex px-5 bg-white space-x-2 shadow py-5'>
        <div className='rounded-full w-10 '>
          <img
            src='https://avataaars.io/?avatarStyle=Transparent&topType=LongHairDreads&accessoriesType=Prescription01&hairColor=Red&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Gray01&eyeType=Squint&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Brown'
            alt="username" />
        </div>
        <div className='flex justify-between w-full items-center'>
          <div className='flex flex-col'>
            <span>{props.user.first_name} {props.user.last_name}</span>
            <span>{props.user.username}</span>
          </div>
          <a href=''>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)