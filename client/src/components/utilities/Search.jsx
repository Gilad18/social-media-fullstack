import axios from 'axios'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import FunctionS from '../utilities/functios'


export default function SearchBar() {

    const userID = localStorage.getItem('id')
    const [cahrs, setChar] = useState('')
    const [loader, setLoader] = useState(false)
    const [results, setResults] = useState([])
    const history = useHistory();


    const getResults = async () => {
        setLoader(true)
        console.log(cahrs)
        let bodyFormData = new FormData();
        bodyFormData.append('keyS', cahrs);
        const theResults = await axios({
            method: 'get',
            url: 'https://social-media-gilad.herokuapp.com/social/api/users/search',
            bodyFormData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        setResults(theResults.data)
        console.log(theResults)
        setLoader(false)
    }

    const goToUser = (item) => {
      history.push(`/user/${userID}/friend/${item}`)
    }



    return (
        <div className="searchBoxSec">
            <div className="serachBox">
                <input className="serachBoxInput" placeholder="Search..."
                    type="text" onChange={(e) => setChar(e.target.value)} />
                <i onClick={getResults} className={`large search icon ${loader ? 'loading' : ''}`}></i>
            </div>
            {
                (results.length > 0 && cahrs.length > 0) && <div className="searchResultsUI">
                    <div className="ui feed">
                        {
                            results.filter((item) => {
                                return item.name.toLowerCase().includes(cahrs.toLowerCase())
                            })
                                .map((item, index) => {
                                    return <React.Fragment key={index}>
                                        <div className="event">
                                            <div className="label" style={{marginRight:'2%'}}>
                                                {
                                                    item.avatar ?
                                                        <img className="ui  circular image" src={`data:image/jpg;base64,${FunctionS(item.avatar.data)}`}
                                                            style={{ maxHeight: '3rem' }} alt="user" />
                                                        :
                                                        <img className="ui  circular image" alt="user" src='https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg' />
                                                }

                                            </div>
                                            <div onClick={()=>goToUser(item._id)} className="content">{item.name}</div>
                                        </div>
                                    </React.Fragment>
                                })}
                    </div>
                </div>
            }
        </div>
    )
}
