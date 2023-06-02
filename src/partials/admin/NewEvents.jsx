import React from "react";
import axios from 'axios'
import { useState, useEffect } from "react";
import Loading from "../Loading";
import RegisterEvent from './RegisterEvent'
const NewEvents = () => {
    const [Event, setEvent] = React.useState([]);
    const [loading, setLoading] = useState(true);
    const [heading, setHeading] = useState("Upcoming Events");
    const [curr, setCurr] = useState(null);
    const [reload, setReload] = useState(false);

    //API call for getting all the past events
    useEffect(() => {
        axios.get('https://unfiltered-connect-backend.vercel.app/api/allevent').then((response) => {
            const sortedEvents = response.data.sort((a, b) => {
                const dateA = new Date(a.date.split("-").reverse().join("-"));
                const dateB = new Date(b.date.split("-").reverse().join("-"));
                return dateA - dateB;
              });   
        setEvent(sortedEvents);
            setLoading(false);
            setReload(false);
        }).catch(response => {
            console.log(response)
            setReload(false);
        });
    }, [curr === null, reload === true]);
    function deleteEvent(id) {
        const result = window.confirm('Are you sure you want to remove this event?');
        var config;
        if (result) {
            config = {
                method: 'delete',
                url: `https://unfiltered-connect-backend.vercel.app/api/eventfind/${id}`,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            axios(config)
                .then(function (response) {
                    setReload(true);
                    alert("Event removed successfully!");
                }).catch(function (error) {
                    setReload(true);

                    alert('Error! Please Try Again');
                });
        }
    }
    return (
        <>
            {loading ?<div className="loader-admin"><Loading /></div> :
                <div className="register-event">
                    <h1 className='admin-headings'>{heading}</h1>
                    <div className="add-soc-admin-btn">
                        {curr === null ? <button onClick={() => { setCurr(<RegisterEvent type={"create"} id={null} />); setHeading("Register a New Event") }}>
                        Register Upcoming Event
                        </button> :
                            <button onClick={() => { setCurr(null); setHeading("Upcoming Events") }}>
                                Go back
                            </button>}
                    </div>
                    <div className="admin-container" style={{ background: 'inherit' }}>
                        {curr === null ?
                            <div className="admin-cards">
                                {Event.map((items, id) => (
                                    <div style={{ position: "relative",borderRadius:"20px" }} className="pasteventcards w-full rounded-lg  lg:max-w-sm" key={id}>
                                        <div className="soc-card-btns">
                                            <i class="fa-regular fa-pen-to-square icon" onClick={() => { setCurr(<RegisterEvent type={"edit"} id={items._id} />); setHeading("Update Upcoming Event") }} style={{ color: "green" }}></i>
                                            <i class="fa-regular fa-trash-can icon" onClick={() => { deleteEvent(items._id) }} style={{ color: "red" }}></i>
                                        </div>
                                        <img
                                            className="object-cover w-full h-60"
                                            src={items.img}
                                            style={{ borderRadius:"20px" }}
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

export default NewEvents