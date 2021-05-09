import React, { useState, useEffect } from 'react'
import { Button } from 'semantic-ui-react'
import './utilities.css'
import axios from 'axios'

export default function Sponsered() {
    const [ad, setAd] = useState([])

    const random = Math.floor(Math.random() * 8);

    useEffect(() => {
        const search = async () => {
            const ads = await axios({
                method: 'get',
                url: `https://final-project-appleseeds.herokuapp.com/api/products/bestSeller/all`,
            })
            setAd(ads.data)
        }
        search()
    }, [])

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    return (
        <React.Fragment>
            { ad.length > 0 &&
                <div className="sponseredSec">
                    <div className="ui yellow teal ribbon label">Sponsered Ad</div>
                    <div className="sponseredAd">
                        <div className="adImage">
                            <img style={{ width: '100%', height: '100%' }} alt="ring"
                                src={`data:image/jpg;base64,${arrayBufferToBase64(ad[random].image.data)}`} />
                        </div>
                        <div className="adInfo">
                            <div className="adInfoDetails">
                                <h4>{ad[random].productName}</h4>
                                <h4>{ad[random].price} ILS</h4>
                            </div>
                            <a href='https://final-project-appleseeds.herokuapp.com' 
                            rel="noopener noreferrer"target="_blank">Shop Now</a>
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}
