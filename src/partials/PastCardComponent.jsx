import React from "react";
import ReactStars from "react-rating-stars-component";
import { pastEvent } from "./config/event";

export default function PastCardComponent() {
    const ratingChanged = (newRating) => {
  console.log(newRating);
};
    return (
        <>
            <section className="relative" style={{ marginTop: "10%", width: "80%", margin: "auto" }}>
                <div style={{ marginTop: "15%" }} className="grid gap-8 lg:grid-cols-4">
                    {pastEvent.map((items, title) => (
                        <div className="eventcards w-full rounded-lg shadow-md lg:max-w-sm" key={title}>
                            <img
                                className="object-cover w-full h-60"
                                src={items.img}
                                alt="image"
                            />
                            <div className="p-2">
                                <h4 className="text-xl font-semibold text-blue-600">

                                    {items.title}
                                </h4>
                                <p className="mb-2 leading-normal">
                                    {items.societies}
                                </p>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                    value={items.rating}
                                />
                                <a href={`/past-event-details/${items.title}`} className="px-4  py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                                Review
                            </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}