import React from 'react'
import './loader.css'

export default function Loader() {
    return (
        <div className="loaderSec">
            <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
            <h4>Updating Your Feed, it will take a moment...</h4>
        </div>
    )
}
