import React from 'react'
import Like from '../likes/Like'
import './ShowAllComments.scss'
function ShowAllComments({userId, comment}) {
  return (
    <div className='ShowAllComments'>
        <Like className='userIcon' user={userId}/>
        <p>{comment}</p>
    </div>
  )
}

export default ShowAllComments