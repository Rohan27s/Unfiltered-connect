import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
export default function CardComponent() {
    const [post, setPost] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://unfiltered-connect-backend.vercel.app/api/allevent').then((response) => {
            setPost(response.data);
        });
    }, []);

    return (

        <>
            <section className="relative" style={{ marginTop: "10%", width: "80%", margin: "auto" }}>
                <div style={{ marginTop: "15%" }} className="grid gap-8 lg:grid-cols-4">

                    {post.map((items, key) => (
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
                                <Link className='blogItem-link' to={`/event-details/${items._id}`}>
                                    View Event ➝
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}