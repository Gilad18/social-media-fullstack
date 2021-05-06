import React from 'react'
import './utilities.css'

export default function Notification({ notes }) {

    return (
        <div className="notificationSec">
            <div class="ui feed">
                {notes.map((item, index) => {
                    return <React.Fragment key={index}>
                        <div class="event">
                            <div class="label">
                                <img src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg" /></div>
                            <div class="content">{item}</div>
                        </div>
                        </React.Fragment>
                  })}
                  {notes.length === 0 && <p style={{textAlign:'center' ,color:'white'}}> No new notifications</p>}
            </div>
        </div>
    )
}
