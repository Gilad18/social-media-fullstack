import React from 'react'
import './utilities.css'

export default function Notification({ notes }) {

    const getIcon = (item) => {
        if(item.includes('liked')) {
            return 'blue like'
        }
        if(item.includes('commented')) {
            return 'teal comment'
        }
        if(item.includes('following')) {
            return 'green user plus'
        }
        if(item.includes('welcome')) {
            return 'orange users'
        }
    }


    return (
        <div className="notificationSec">
            <div className="ui feed">
              {notes.map((item, index) => {
                    return <React.Fragment key={index}>
                        <div className="event">
                            <div className="label">
                                {
                                
                                }
                                <i className={`${getIcon(item)} icon`}></i></div>
                            <div className="content">{item}</div>
                        </div>
                        </React.Fragment>
                  })}
                  {notes.length === 0 && <p style={{textAlign:'center' ,color:'white'}}> No new notifications</p>}
            </div>
        </div>
    )
}
