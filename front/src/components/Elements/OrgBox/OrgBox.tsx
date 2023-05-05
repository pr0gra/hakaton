import React from 'react'
import './OrgBox.scss'

interface OrgBoxProps {
    img: string
}

function OrgBox({img}: OrgBoxProps) {
  return (
    <div className="orgbox">
        <img className="orgbox__img" src={img} />
    </div>
  )
}

export default OrgBox