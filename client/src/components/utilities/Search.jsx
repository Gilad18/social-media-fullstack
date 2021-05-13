import axios from 'axios'
import e from 'cors'
import React, { useState } from 'react'
import { SearchResults } from 'semantic-ui-react'
// import { Search, Grid } from 'semantic-ui-react'

export default function SearchBar() {

    const token = localStorage.getItem('token')

    const [char, setChar] = useState('')
    const [loader, setLoader] = useState(false)
    const [results, setResults] = useState([])

    const getResults = async () => {
        setLoader(true)
        console.log(char)
        const theResults = await axios({
            method : 'get',
            url : 'http://localhost:4500/social/api/users/search',
            data : {
                key : char
            },
            headers : {
                'Authorization':`Bearer ${token}`
            }
        })
        console.log(theResults.response)
        setLoader(false)
        setResults(theResults.data)
    }

    var timerID;

   const handleType = (event) => {
       clearTimeout(timerID)
       setChar(event.target.value)
       console.log(event.target.value)
       if(event.target.value.length > 0) {
        timerID = setTimeout(() => {
            getResults()
       }, 1200);
       }
   }

    return (
        <div className="searchBoxSec">
        <div className="serachBox">
           <input className="serachBoxInput" placeholder="Search..."
           type="text"  onChange={handleType}/>
           <i className={`large search icon ${loader ? 'loading' : ''}`}></i>
        </div>
           {
               results.length > 0 && <React.Fragment>

                   
               </React.Fragment>
           }
        </div>
    )
}
