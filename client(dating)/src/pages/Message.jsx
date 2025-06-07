import React from 'react'
import Chat from '../components/Chat'
import { useParams } from 'react-router-dom'

function Message() {
    const {id}=useParams()
    localStorage.setItem('sentid','68398f0ab32e1cb3833b49a0')
    const sentid=localStorage.getItem('userId')
    console.log(sentid);
    
  return (
    <div>
           <Chat receiverId={id} senderId={sentid}/>

    </div>
  )
}

export default Message
