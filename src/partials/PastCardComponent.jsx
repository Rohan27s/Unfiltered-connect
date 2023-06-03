import React from "react";
import axios from 'axios'
import { useState, useEffect } from "react";
import Loading from "./Loading";
// Past Events Component
export default function PastCardComponent() {
    const [pastEvent, setPastEvent] = useState([]);
    const [loading, setLoading] = useState(true);
    //API call for getting all the past events
    useEffect(() => {
        axios.get('https://unfiltered-connect-backend.vercel.app/api/allpastevent').then((response) => {
            setLoading(false);
            const sortedEvents = response.data.sort((a, b) => {
                const dateA = new Date(a.date.split("-").reverse().join("-"));
                const dateB = new Date(b.date.split("-").reverse().join("-"));
                return dateA - dateB;
              });
            //   console.log(sortedEvents);
            setPastEvent(sortedEvents.reverse());

        });
    }, []);
    return (
        <>
            {loading ? <Loading/> :

                <section className="relative event-card-compo">
                    <div style={{ marginTop: "15%" }} className="grid gap-8 lg:grid-cols-4">
                        {pastEvent.map((items, id) => (
                         <a href={`/past-event-details/${items._id}`} >

                            <div className="pasteventcards w-full rounded-lg shadow-md lg:max-w-sm" key={id}>
                                <img
                                    className="object-cover w-full h-60"
                                    src={items.img}
                                    alt="image"
                                />
                                <div className="p-2">
                                    <h4 className="text-xl font-semibold text-blue-600">

                                        {items.title}
                                    </h4>
                                    <p className="leading-normal" style={{marginBottom: "10px"}}>
                                        {items.content}
                                    </p>
                                </div>
                                
                            </div>
                            </a>

                        ))}
                    </div>
                </section>}
        </>
    );
}