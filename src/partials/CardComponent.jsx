import React from "react";
import { upcomingEvent } from "./config/event";
export default function CardComponent() {
  
    return (
        <>
        <section className="relative" style={{marginTop: "10%",width:"80%",margin:"auto"}}>
            <div style={{marginTop: "15%"}} className="grid gap-8 lg:grid-cols-4">
            
                {upcomingEvent.map((items,key) => (
                    <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={items.title}>
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
                            {items.societies}
                            </p>
                            <p className="mb-2 leading-normal font-semibold">
                            Date: {items.date}
                            </p>
                            <a href={`/event-details/${items.title}`} className="px-4  py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                                View Event
                            </a>

                        </div>
                    </div>
                ))}
            </div>
            </section>
        </>
    );
}