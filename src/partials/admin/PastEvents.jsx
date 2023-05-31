import React from "react";
import axios from 'axios'
import { useState, useEffect } from "react";
import Loading from "../Loading";
import RegisterPastEvent from  './RegisterPastEvent'
const PastEvents = () => {
    const [pastEvent, setPastEvent] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [heading, setHeading] = useState("Reported Past Events");
    const [curr, setCurr] = useState(null);

    //API call for getting all the past events
    React.useEffect(() => {
        axios.get('https://unfiltered-connect-backend.vercel.app/api/allpastevent').then((response) => {
            setPastEvent(response.data);
            setLoading(false);
        });
    }, []);
    return (
        <>
            {loading ? <Loading /> :
                <div className="register-event">
                    <h1 className='admin-headings'>{heading}</h1>
                    <div className="add-soc-admin-btn">
                        {curr === null ? <button onClick={() => { setCurr(<RegisterPastEvent type={"create"} id={null} />); setHeading("Report a Past Event") }}>
                            Report Past Event
                        </button> :
                            <button onClick={() => { setCurr(null); setHeading("Reported Past Events") }}>
                                Go back
                            </button>}
                    </div>
          <div className="admin-container" style={{ background: 'inherit' }}>

                    {curr === null ?

                        <div className="admin-cards">
                            {pastEvent.map((items, id) => (
                                <div className="pasteventcards w-full rounded-lg  lg:max-w-sm" key={id}>
                                    <img
                                        className="object-cover w-full h-60"
                                        src={items.img}
                                        alt="image"
                                    />
                                    <div className="p-2">
                                        <h4 className="text-xl font-semibold text-blue-600">
                                            {items.title}
                                        </h4>
                                        <p className="leading-normal" style={{ marginBottom: "10px" }}>
                                            {items.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div> : ""}
                    {curr}
                    </div>
                </div>
            }
        </>
    )
}

export default PastEvents