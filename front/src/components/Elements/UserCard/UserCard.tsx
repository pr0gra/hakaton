import React from 'react'
import './UserCard.scss'

interface UserCardProps {
  data: {
    username: string

  }
}

function UserCard({data}: UserCardProps) {
  return (
    <div className="usercard">
      <h1>{data.username}</h1>
    </div>
  )
}

export default UserCard