import React, { useState } from "react";
import { ReactContact } from "../components/Contact/Contact";

const ContactPage = () => {
  const handleSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <ReactContact onSubmit={handleSubmit} />
    </div>
  );
};

export default ContactPage;
