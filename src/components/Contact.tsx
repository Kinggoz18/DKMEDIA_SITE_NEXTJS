'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHook';
import { ContactProps } from '@/lib/interfaces/props/ContactProps'
import { setIsNewsletterPopupOpen } from '@/lib/redux/NewsletterSlice';
import Image from 'next/image';
import React from 'react'

export default function Contact(props: ContactProps) {
  const { contact } = props;

  const newsletterStore = useAppSelector(state => state.newsletter);
  const dispatch = useAppDispatch();

  /**
   * Toggle news letter popup
   */
  function onSubscribeClick() {
    console.log("Clicked")

    if (!newsletterStore.isOpen)
      document.location = "#events"
    dispatch(setIsNewsletterPopupOpen(true))
  }

  return (
    <footer className="bottom-0 releative row-start-3 flex flex-col items-start gap-[24px] flex-wrap justify-start px-[20px] py-10">
      <Image src='/dkMediaLogo.png' width={233} height={59} alt='DKMEDIA logo'></Image>

      <div className='w-full'>
        <div className="text-neutral-200 h2-small font-bold relative">JOIN THE DKMEDIA<sub className="text-sm">{" "}HG</sub><br></br>{" "}FAMILY</div>
        <div className='font-Palanquin'>
          Sign up for updates on the latest events, information and more
        </div>
      </div>

      <div className='bg-primary-500 px-[24px] py-[14px] font-passion text-[22px] cursor-pointer w-[167px] text-center' onClick={() => onSubscribeClick()}>
        Subscribe
      </div>

      <div className='flex flex-row gap-x-4'>
        <a href={contact.instagramLink} target='_blank' className='bg-section rounded-full h-[60px] w-[61.8px] flex items-center justify-center'>
          <img src="/instagram-icon.svg" alt="Instagram icon" className='h-[30px] w-[30px]' />
        </a>

        <a href={contact.tiktokLink} target='_blank' className='bg-section rounded-full h-[60px] w-[61.8px] flex items-center justify-center'>
          <img src="/tiktok-icon.svg" alt="Instagram icon" className='h-[30px] w-[30px]' />
        </a>
      </div>

      <a className='underline font-semibold cursor-pointer' href={`mailto:${contact.email}`}>{contact.email}</a>
    </footer>
  )
}
