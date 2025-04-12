'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHook';
import React, { useEffect, useRef, useState } from 'react'
import Exit from './Exit';
import { setIsNewsletterPopupOpen } from '@/lib/redux/NewsletterSlice';
import { CheckboxCheckOtions } from '@/lib/interfaces/props/CheckboxContainerProps';
import CheckboxContainer from './CheckboxContainer';
import SubscriptionService from '@/services/SubscriptionService';
import { ISubscriptionUpdate } from '@/lib/interfaces/ISubscription';
import ThrowAsyncError, { toggleError } from './ThrowAsyncError';
import FeedbackPopup, { toggleFeedback } from './FeedbackPopup';

export default function Newsletter() {
  const newsletterStore = useAppSelector(state => state.newsletter.newsletter);
  const subscriptionService = new SubscriptionService();
  const dispatch = useAppDispatch();

  const errorRef = useRef(null);
  const feedbackRef = useRef(null);

  const [responseError, setResponseError] = useState("");

  const defaultCheckbox = {
    optionId: 0,
    isCheck: false,
    option: "Yes, I would like DKMEDIA to contact me electronically, which  may include but are not limited to communications via email and phone.",
  }

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [checkbox, setCheckbox] = useState<CheckboxCheckOtions>(defaultCheckbox)

  /**
  * Handler to set influences for dancing
  * @param {CheckboxCheckOtions} option Seleced/unselected influence
  */
  const handleSetIsChecked = (option: CheckboxCheckOtions) => {
    console.log({ option });
    setCheckbox(option);
  };

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
    if (!checkbox.isCheck || firstname == "" || email === "") return false;
    return true;
  }

  /**
   * On subscribe click
   * @returns 
   */
  const onSubscribeClick = async () => {
    if (!isBtnActive() || !isValidEmail(email)) return;

    try {
      const data: ISubscriptionUpdate = {
        firstName: firstname,
        lastName: lastname,
        email: email,
      }

      const response = await subscriptionService.addSubscription(data)
      if (!response?._id) {
        throw new Error("Sorry, something wen wrong");
      }

      setFirstname("")
      setLastName("");
      setEmail("")
      setCheckbox(defaultCheckbox);
      handleShowFeedback("Subscribed!")
      setTimeout(() => {
        dispatch(setIsNewsletterPopupOpen(false));
      }, 2000)
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


  useEffect(() => {
    if (newsletterStore?.isOpen)
      document.documentElement.style.overflow = 'hidden';
    else
      document.documentElement.style.overflow = '';
  }, [newsletterStore.isOpen])

  console.log({ newsletterStore })

  if (!newsletterStore.isOpen) return null;

  return (
    <>
      <div className="absolute h-screen w-screen bg-neutral-900/50 z-10"></div>
      <section className='absolute w-[85%] min-w-[300px] max-w-[600px] h-[50vh] min-h-[470px] ml-auto mr-auto left-0 right-0 bg-neutral-950 !z-20 top-[20vh] px-7 flex flex-col py-5 gap-y-8'>
        <div className='flex flex-row w-full items-center'>
          <h2 className='h2-small lg:hidden'>Newsletter</h2>
          <h2 className='h2-large lg:block hidden'>Newsletter</h2>
          <Exit onClick={() => dispatch(setIsNewsletterPopupOpen(false))} className='!absolute right-4' />
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex flex-col w-full gap-y-1'>
            <div>Name (required)</div>

            <div className='flex flex-row w-full gap-x-[20px]'>
              <input
                type="text"
                value={firstname}
                placeholder='First name'
                onChange={(e) => setFirstname(e.currentTarget.value)}
                className='w-[50%] font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-3 focus:outline-none py-1 '
              />

              <input
                type="text"
                value={lastname}
                placeholder='Lirst name'
                onChange={(e) => setLastName(e.currentTarget.value)}
                className='w-[50%] font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-3 focus:outline-none py-1 '
              />
            </div>
          </div>

          <div className='flex flex-col w-full gap-y-1'>
            <label htmlFor="Email">Email (required)</label>
            <input
              name='Email'
              type="email"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.currentTarget.value)}
              className='w-full font-Bebas rounded-2xl text-neutral-700 bg-neutral-100 px-3 focus:outline-none py-1 '
            />
          </div>
        </div>

        <ThrowAsyncError
          responseError={responseError}
          errorRef={errorRef}
          className={"!bottom-[10%]"}
        />

        <FeedbackPopup
          responseError={responseError}
          errorRef={feedbackRef}
          className={"!bottom-[20%]"}
        />


        <CheckboxContainer
          option={checkbox?.option}
          handleCheck={handleSetIsChecked}
          optionId={checkbox?.optionId}
          isChecked={checkbox?.isCheck}
        />

        <div className={`w-full  cursor-pointer text-center font-Bebas py-1 md:py-2 md:h2-small ${isBtnActive() ? "bg-primary-500" : "bg-primary-500/50"}`} onClick={() => onSubscribeClick()}>
          Subscribe
        </div>
      </section>
    </>

  )
}
