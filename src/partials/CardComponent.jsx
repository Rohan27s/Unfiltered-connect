import React from "react";

export default function CardComponent() {
    const posts = [
        {
            title: "Event 1",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },
        {
            title: "Event 2",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },
        {
            title: "Event 3",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },
        {
            title: "Event 4",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },
        {
            title: "Event 5",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },{
            title: "Event 6",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },{
            title: "Event 7",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },{
            title: "Event 8",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },
    ];
    return (
        <>
        <section className="relative" style={{marginTop: "10%",width:"80%",margin:"auto"}}>
            <div style={{marginTop: "15%"}} className="grid gap-8 lg:grid-cols-4">
                {posts.map((items, key) => (
                    <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={key}>
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
                            <a href="event-details" className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
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