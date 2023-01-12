import React from "react";
import { useState } from "react";
import axios from 'axios'
import Loading from "./Loading";
export default function CardComponent() {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = React.useState([]);
    //API call for getting info about all the events
    React.useEffect(() => {
        axios.get('https://unfiltered-connect-backend.vercel.app/api/allevent').then((response) => {
            setPost(response.data);
            setLoading(false);
        });
    }, []);
    return (
        <>
            {loading ? <Loading/> :
                <section className="relative event-card-compo" >
                    <div style={{ marginTop: "15%" }} className="grid gap-8 lg:grid-cols-4">

                        {post.map((items, key) => (
                                    <a href={`/event-details/${items._id}`} >

                            <div className="eventcards w-full rounded-lg shadow-md lg:max-w-sm" key={items.title}>
                                <img
                                    className="object-cover w-full h-60"
                                    src={items.img}
                                    alt="image"
                                />
                                <div className="p-4">
                                    <h4 className="text-xl font-semibold text-blue-600">

                                        {items.title}
                                    </h4>
                                    <p className="mb-2 leading-normal">
                                        {items.content}
                                    </p>
                                    <p className="mb-2 leading-normal font-semibold">
                                        Date: {items.date}
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