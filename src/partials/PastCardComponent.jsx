import React from "react";
import ReactStars from "react-rating-stars-component";
export default function PastCardComponent() {
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
        }, {
            title: "Event 6",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        }, {
            title: "Event 7",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        }, {
            title: "Event 8",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        }, {
            title: "Event 9",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },
        {
            title: "Event 10",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description"
        },
    ];
    const ratingChanged = (newRating) => {
  console.log(newRating);
};
    return (
        <>
            <section className="relative" style={{ marginTop: "10%", width: "80%", margin: "auto" }}>
                <div style={{ marginTop: "15%" }} className="grid gap-8 lg:grid-cols-4">
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
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                    value={2}
                                />,
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}