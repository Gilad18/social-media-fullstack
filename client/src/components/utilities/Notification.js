import React from 'react'
import './notification.css'
import { Feed, Image } from 'semantic-ui-react'
import { networkInterfaces } from 'os'

export default function Notification() {

    let myNotes = [1,2]       // just a dummy variable, my notes should be a props inherit from Header with an array of notification form the User
    return (
        <div className="notificationSec">
           <div class="ui feed">
               {
                   myNotes.length>0 ? 
                   <React.Fragment>
                   <div class="event">
                   <div class="label">
                       <img src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"/></div>
                       <div class="content">You added Elliot Fu to the group Coworkers</div>
                       </div>
                       <div class="event">
                           <div class="label">
                               <img src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"/></div>
                               <div class="content">You added Elliot Fu to the group Coworkers</div></div> </React.Fragment>
                               :
                               <h4 style={{textAlign:'center'}}>No New Notification</h4>
}
              

                               </div>
       
        </div>
    )
}
