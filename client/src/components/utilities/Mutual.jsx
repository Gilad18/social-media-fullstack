import React from 'react'
import FunctionS from '../utilities/functios'

export default function Mutual({ name,pic }) {
    return (
        <div className="mutualFriendCard">
            {pic ?
                <img className="profilePic" alt={`${name}`}
                    src={`data:image/jpg;base64,${FunctionS(pic.data)}`} />
                :
                <img className="profilePic" alt="Empty"
                    src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
            }
            <p>{name}</p>
        </div>
    )
}
