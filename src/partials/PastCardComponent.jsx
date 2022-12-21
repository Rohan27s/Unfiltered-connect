import React from "react";
import ReactStars from "react-rating-stars-component";
export default function PastCardComponent() {
    const posts = [
        {
            title: "Blackout",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Computer Society of India, Student Branch MSI", 
            rating:3
        },
        {
            title: "Pointer to Future",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Computer Society of India, Student Branch MSI",
            rating:5
        },
        {
            title: "Event 3",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description",
            rating:4
        },
        {
            title: "Event 4",
            img: "https://res.cloudinary.com/rohangotwal/image/upload/v1671028731/Blog/2_nigkbt.jpg",
            content: "Event Description",
            rating:1
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
                            <div className="p-2">
                                <h4 className="text-xl font-semibold text-blue-600">

                                    {items.title}
                                </h4>
                                <p className="mb-2 leading-normal">
                                    {items.content}
                                </p>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={22}
                                    activeColor="#ffd700"
                                    value={items.rating}
                                />
                                <a href="event-details" className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
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