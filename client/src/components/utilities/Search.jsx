import axios from 'axios'
import React, { useState, useEffect } from 'react'


export default function SearchBar() {

    const [cahrs, setChar] = useState('')
    const [loader, setLoader] = useState(false)
    const [results, setResults] = useState([])


    // useEffect(() => {

    //     const timeOutId = setTimeout(() => {
    //         if (char.length > 0) {
    //             getResults()
    //         }
    //     }, 1200);
    //     return () => {
    //         clearTimeout(timeOutId)
    //     }
    // }, [char])

    const getResults = async () => {
        setLoader(true)
        console.log(cahrs)
        const theResults = await axios.get('http://localhost:4500/social/api/users/search',
            {
                keyS: cahrs

            })
        setResults(theResults.data)
        console.log(theResults.data)
        setLoader(false)
    }



    return (
        <div className="searchBoxSec">
            <div className="serachBox">
                <input className="serachBoxInput" placeholder="Search..."
                    type="text" onChange={(e) => setChar(e.target.value)} />
                <i onClick={getResults} className={`large search icon ${loader ? 'loading' : ''}`}></i>
            </div>
            {
                results.length > 0 && <React.Fragment>


                </React.Fragment>
            }
        </div>
    )
}
