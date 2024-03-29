import React from "react";
import axios from 'axios'
import { useState, useEffect } from "react";
import Loading from "../Loading";
import RegisterPastEvent from './RegisterPastEvent'
const PastEvents = () => {
    const [pastEvent, setPastEvent] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [heading, setHeading] = useState("Past Events");
    const [curr, setCurr] = useState(null);
    const [reload, setReload] = useState(false);

    //API call for getting all the past events
    useEffect(() => {
        axios.get('https://unfiltered-connect-backend.vercel.app/api/allpastevent').then((response) => {
            const sortedEvents = response.data.sort((a, b) => {
                const dateA = new Date(a.date.split("-").reverse().join("-"));
                const dateB = new Date(b.date.split("-").reverse().join("-"));
                return dateA - dateB;
              });
            //   console.log(sortedEvents);
            setPastEvent(sortedEvents.reverse());
            setLoading(false);
            setReload(false);
        }).catch(response => {
            console.log(response)
            setReload(false);
        });
    }, [curr === null, reload === true]);
    function deletePastEvent(id) {
        const result = window.confirm('Are you sure you want to remove this past event?');
        var config;
        if (result) {
            config = {
                method: 'delete',
                url: `https://unfiltered-connect-backend.vercel.app/api/pasteventfind/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            axios(config)
                .then(function (response) {
                    setReload(true);
                    alert("Past Event removed successfully!");
                }).catch(function (error) {
                    setReload(true);

                    alert('Error! Please Try Again');
                });
        }
    }
    return (
        <>
            {loading ? <div className="loader-admin"><Loading /></div> :
                <div className="register-event">
                    <h1 className='admin-headings'>{heading}</h1>
                    <div className="add-soc-admin-btn">
                        {curr === null ? <button onClick={() => { setCurr(<RegisterPastEvent type={"create"} id={null} />); setHeading("Report a Past Event") }}>
                            Report Past Event
                        </button> :
                            <button onClick={() => { setCurr(null); setHeading("Past Events") }}>
                                Go back
                            </button>}
                    </div>
                    <div className="admin-container" style={{ background: 'inherit' }}>
                        {curr === null ?
                            <div className="admin-cards">
                                {pastEvent.map((items, id) => (
                                    <div style={{ position: "relative",borderRadius:"20px",marginLeft:"auto",marginRight:"auto" }} className="pasteventcards w-full rounded-lg  lg:max-w-sm" key={id}>
                                        <div className="soc-card-btns">
                                            <i class="fa-regular fa-pen-to-square icon" onClick={() => { setCurr(<RegisterPastEvent type={"edit"} id={items._id} />); setHeading("Update Past Event") }} style={{ color: "green" }}></i>
                                            <i class="fa-regular fa-trash-can icon" onClick={() => { deletePastEvent(items._id) }} style={{ color: "red" }}></i>
                                        </div>
                                        <img
                                        style={{ borderRadius:"20px" }}
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