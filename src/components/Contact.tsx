'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHook';
import { ContactProps } from '@/lib/interfaces/props/ContactProps'
import { setIsNewsletterPopupOpen } from '@/lib/redux/NewsletterSlice';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Contact(props: ContactProps) {
  const { contact } = props;

  const newsletterStore = useAppSelector(state => state.newsletter);
  const dispatch = useAppDispatch();
  const path = usePathname();
  /**
   * Toggle news letter popup
   */
  function onSubscribeClick() {
    console.log("Clicked")

    if (!newsletterStore.isOpen)
      if (!path.includes('contact') && !path.includes('media'))
        document.location = "#events"

    dispatch(setIsNewsletterPopupOpen(true))
  }

  return (
    <>
      <footer className="bottom-0 releative row-start-3 flex flex-col items-start gap-[24px] flex-wrap justify-start px-[20px] py-10 lg:px-[40px] lg:py-[20px] lg:hidden bg-background">
        <Image src='/dkMediaLogo.png' width={233} height={59} alt='DKMEDIA logo'></Image>

        <div className='w-full'>
          <div className="text-neutral-200 h2-small font-bold relative">JOIN THE DKMEDIA<sub className="text-sm">{" "}HG</sub><br></br>{" "}FAMILY</div>
          <div className='font-Palanquin'>
            Sign up for updates on the latest events, information and more
          </div>
        </div>

        <div className='bg-primary-500 px-[24px] py-[14px] font-Bebas text-[22px] cursor-pointer w-[167px] text-center' onClick={() => onSubscribeClick()}>
          Subscribe
        </div>

        <div className='flex flex-row gap-x-4'>
          <a href={contact.instagramLink} target='_blank' className='bg-neutral-200 rounded-full h-[60px] w-[61.8px] flex items-center justify-center'>
            <img src="/instagram-icon.svg" alt="Instagram icon" className='h-[30px] w-[30px]' />
          </a>

          <a href={contact.tiktokLink} target='_blank' className='bg-neutral-200 rounded-full h-[60px] w-[61.8px] flex items-center justify-center'>
            <img src="/tiktok-icon.svg" alt="Instagram icon" className='h-[30px] w-[30px]' />
          </a>
        </div>

        <a className='underline font-semibold cursor-pointer' href={`mailto:${contact.email}`}>{contact.email}</a>
      </footer>

      <footer className="w-full hidden bottom-0 releative row-start-3 items-start gap-[24px] flex-wrap justify-start px-[20px] py-10 lg:px-[40px] lg:py-[20px] lg:flex lg:flex-col">
        <div className='flex flex-row w-full'>
          <Image src='/dkMediaLogo.png' width={233} height={59} alt='DKMEDIA logo' className='max-h-[59px] max-w-[233px]'></Image>

          <div className='flex flex-col grow items-end gap-y-4'>
            <div className="text-neutral-200 h2-small font-bold relative text-right">JOIN THE DKMEDIA<sub className="text-sm">{" "}HG</sub><br></br>{" "}FAMILY</div>
            <div className='font-Palanquin'>
              Sign up for updates on the latest events, information and more
            </div>
            <div className='bg-primary-500 px-[24px] py-[14px] font-Bebas text-[22px] cursor-pointer w-[167px] text-center' onClick={() => onSubscribeClick()}>
              Subscribe
            </div>
          </div>



        </div>

        <div className='w-full flex flex-row'>
          <a className='underline font-semibold cursor-pointer ml-3' href={`mailto:${contact.email}`}>{contact.email}</a>

          <div className='flex flex-row gap-x-4 grow justify-end'>
            <a href={contact.instagramLink} target='_blank' className='bg-neutral-200 rounded-full h-[60px] w-[61.8px] flex items-center justify-center'>
              <img src="/instagram-icon.svg" alt="Instagram icon" className='h-[30px] w-[30px]' />
            </a>

            <a href={contact.tiktokLink} target='_blank' className='bg-neutral-200 rounded-full h-[60px] w-[61.8px] flex items-center justify-center'>
              <img src="/tiktok-icon.svg" alt="Instagram icon" className='h-[30px] w-[30px]' />
            </a>
          </div>
        </div>
      </footer>

    </>
  )
}
