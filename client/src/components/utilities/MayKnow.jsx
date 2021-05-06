import React from 'react'
import { Button , Icon} from 'semantic-ui-react'
import './utilities.css'

export default function MayKnow() {
    return (
       <div className="peopleYouMayKnowSec">
              <div class="ui teal left ribbon label">PeopleYou May Know</div>
              <button style={{float:'right' , backgroundColor:'transparent', border:'none'}}><Icon size='large' color='olive' name='refresh' /></button>
               <div className="peopleYouMayKnow">
               <div className="ui card" style={{maxWidth:'35%' , padding:'1%' ,margin:'0'}}>
               <div className="image"><img src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'/></div>
                <div className="content">
                <div className="header" style={{fontSize:'14px'}}>Matthew</div> 
                <div className="extra content" style={{marginBottom:'10%'}}><a><i aria-hidden="true" className="user icon"></i>22</a></div>
                <Button secondary>Follow</Button>
                </div>
               </div>
             
               <div className="ui card" style={{maxWidth:'35%' , padding:'1%',margin:'0'}}>
               <div className="image"><img src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg'/></div>
                <div className="content">
                <div className="header" style={{fontSize:'14px'}}>Matthew</div> 
                <div className="extra content" style={{marginBottom:'10%'}}><a><i aria-hidden="true" className="user icon"></i>22</a></div>
                <Button secondary>Follow</Button>
                </div>
               </div>
           </div>
           </div>
    )
}
