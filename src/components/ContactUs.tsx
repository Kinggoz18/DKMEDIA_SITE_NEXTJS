'use client'

import IContactUs from "@/lib/interfaces/IContactUs";
import { ContactUsService } from "@/services/ContactUsService"
import { useRef, useState } from "react";
import ThrowAsyncError, { toggleError } from "./ThrowAsyncError";
import FeedbackPopup, { toggleFeedback } from "./FeedbackPopup";
import Newsletter from "./Newsletter";

export default function ContactUs() {

  const contactUsService = new ContactUsService();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const errorRef = useRef(null);
  const feedbackRef = useRef(null);

  const [responseError, setResponseError] = useState("");

  /**
   * Check if the email is valid
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      handleThrowError("Enter a valid email address");
      return isValid;
    }

    return isValid;
  };

  /**
   * Is the primary button active
   */
  const isBtnActive = () => {
    if (firstname == "" || email === "" || subject == "" || message === "") return false;
    return true;
  }

  function isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{4}$/;
    const isValid = phoneRegex.test(email) || /^\d{10}$/.test(phone);
    if (!isValid && phone != "") {
      handleThrowError("Enter a valid phone number");
      return false;
    }

    return true;
  }

  /**
   * On subscribe click
   * @returns 
   */
  const onSendClick = async () => {
    if (!isBtnActive() || !isValidEmail(email) || !isValidPhoneNumber(phone)) return;

    try {
      const data: IContactUs = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        subject: subject,
        company: company,
        phone: phone,
        message: message,
      }

      const response = await contactUsService.addContactUs(data)
      if (!response?._id) {
        throw new Error("Sorry, something wen wrong");
      }

      setFirstname("");
      setLastName("");
      setEmail("");
      setSubject("")
      setCompany("")
      setPhone("")
      setMessage("")
      handleShowFeedback("Message sent!")
    } catch (error: any) {
      console.log(error)
      setEmail("")
      handleThrowError(error?.message)
    }
  }

  /**
  * Throw error from response
  * @param {*} errorMsg
  */
  const handleThrowError = (errorMsg: string) => {
    setResponseError(errorMsg);

    setTimeout(() => {
      toggleError(errorRef);
    }, 400);
  };

  /**
  * Throw error from response
  * @param {*} errorMsg
  */
  const handleShowFeedback = (errorMsg: string) => {
    setResponseError(errorMsg);

    setTimeout(() => {
      toggleFeedback(feedbackRef);
    }, 400);
  };

  return (
    <main className="bg-background w-full h-full relative grid grid-flow-row justify-center">
      <Newsletter />
      <div className="grid grid-flow-row px-[25px] gap-y-[20px] items-center overflow-hidden h-[800px] max-w-[800px]">
        <div className="h2-small lg:hidden w-full text-center text-neutral-100">Contact Us</div>
        <h2 className='h2-large lg:block hidden w-full text-center text-neutral-100'>Contact Us</h2>

        <div className='flex flex-col gap-4'>
          <div>Have questions or want to work with us? Send us a message.</div>
          {/**************** Name section ************************/}
          <div className='flex flex-col w-full gap-y-1'>
            <div>Name (required)</div>

            <div className='flex flex-row w-full gap-x-[20px]'>
              <input
                type="text"
                value={firstname}
                placeholder='First name'
                onChange={(e) => setFirstname(e.currentTarget.value)}
                className='w-[50%] font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-4 py-1 focus:outline-none'
              />

              <input
                type="text"
                value={lastname}
                placeholder='Lirst name'
                onChange={(e) => setLastName(e.currentTarget.value)}
                className='w-[50%] font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-4 py-1 focus:outline-none'
              />
            </div>
          </div>

          {/**************** Company section ************************/}
          <div className='flex flex-col w-full gap-y-1'>
            <label htmlFor="Company">Company</label>
            <input
              name='Company'
              type="text"
              value={company}
              placeholder='Company'
              onChange={(e) => setCompany(e.currentTarget.value)}
              className='w-full font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-4 py-1 focus:outline-none'
            />
          </div>

          {/**************** Email section ************************/}
          <div className='flex flex-col w-full gap-y-1'>
            <label htmlFor="Email">Email (required)</label>
            <input
              name='Email'
              type="email"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.currentTarget.value)}
              className='w-full font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-4 py-1 focus:outline-none'
            />
          </div>

          {/**************** Phone section ************************/}
          <div className='flex flex-col w-full gap-y-1'>
            <label htmlFor="Phone">Phone</label>
            <input
              name='Phone'
              type="text"
              value={phone}
              placeholder='Phone'
              onChange={(e) => setPhone(e.currentTarget.value)}
              className='w-full font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-4 py-1 focus:outline-none'
            />
          </div>

          {/**************** Subject section ************************/}
          <div className='flex flex-col w-full gap-y-1'>
            <label htmlFor="Subject">Subject (Required)</label>
            <input
              name='Subject'
              type="text"
              value={subject}
              placeholder='Subject'
              onChange={(e) => setSubject(e.currentTarget.value)}
              className='w-full font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-4 py-1 focus:outline-none'
            />
          </div>

          {/**************** Message section ************************/}
          <div className='flex flex-col w-full gap-y-1'>
            <label htmlFor="Message">Message (required)</label>
            <textarea
              name='Message'
              value={message}
              placeholder='Message to DKMedia'
              onChange={(e) => setMessage(e.currentTarget.value)}
              rows={5}
              className='w-full font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-4 py-1 focus:outline-none resize-none'
            />
          </div>
        </div>
        <div className={`w-full max-w-[423px]  cursor-pointer text-center font-Bebas py-2 justify-self-center ${isBtnActive() ? "bg-primary-500" : "bg-primary-500/50"}`} onClick={() => onSendClick()}>
          Send message</div>

        <ThrowAsyncError
          responseError={responseError}
          errorRef={errorRef}
          className={"!bottom-[20%]"}
        />

        <FeedbackPopup
          responseError={responseError}
          errorRef={feedbackRef}
          className={"!bottom-[20%]"}
        />

      </div>
    </main>
  )
}
