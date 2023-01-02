import React from "react";

const FAQ = ({ faq}) => {
  return (
    <div
      className={"faq " + (false ? "open" : "")}
      onClick={() => toggleFAQ(1)}
    >
      <div className="faq-question">{faq.question1}</div>
      <div className="faq-answer">{faq.answer1}</div>
    </div>
  );
};

export default FAQ;