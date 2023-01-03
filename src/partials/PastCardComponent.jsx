import React from "react";
import { pastEvent } from "./config/event";
import axios from 'axios'
import { useState, useEffect } from "react";

export default function PastCardComponent() {
    const [pastEvent, setPastEvent] = React.useState([]);
  const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        axios.get('https://unfiltered-connect-backend.vercel.app/api/allpastevent').then((response) => {
            setPastEvent(response.data);
        setLoading(false);

        });
    }, []);
    return (
        <>
    {loading ? <div className='loading'> <h1 >Loading...</h1></div> :

            <section className="relative" style={{ marginTop: "10%", width: "80%", margin: "auto" }}>
                <div style={{ marginTop: "15%" }} className="grid gap-8 lg:grid-cols-4">
                    {pastEvent.map((items, id) => (
                        <div className="eventcards w-full rounded-lg shadow-md lg:max-w-sm" key={id}>
                            <img
                                className="object-cover w-full h-60"
                                src={items.img}
                                alt="image"
                            />
                            <div className="p-2">
                                <h4 className="text-xl font-semibold text-blue-600">

                                    {items.title}
                                </h4>
                                <p className="leading-normal">
                                    {items.content}
                                </p>
                                <a href={`/past-event-details/${items._id}`} className="px-4  py-2 my-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                                Know more
                            </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>}
        </>
    );
}