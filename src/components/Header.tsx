"use client"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHook';
import { setIsNewsletterPopupOpen } from '@/lib/redux/NewsletterSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const newsletterStore = useAppSelector(state => state.newsletter.newsletter);
  const dispatch = useAppDispatch();
  const path = usePathname();
  const isContactUs = path.includes("/contact")
  const isMediaPage = path.includes("/media");

  /**
  * Toggle header open on mobile screen
  */
  function toggleMobileOptions() {
    if (newsletterStore.isOpen) return;

    if (isHeaderOpen) {
      document.documentElement.style.overflow = '';
      setIsHeaderOpen(false)
    } else {
      document.documentElement.style.overflow = 'hidden';
      setIsHeaderOpen(true)
    }

  }

  /**
   * Toggle news letter popup
   */
  function onSubscribeClick() {
    if (!newsletterStore.isOpen)
      setIsHeaderOpen(false)
    dispatch(setIsNewsletterPopupOpen(true))
  }

  return (
    <>
      <header className="top-0 w-full p-4 py-8 flex flex-row h-[100px] items-center justify-items-center justify-between bg-background">
        <img src="/dkMediaLogo.png" className="w-[140px] h-[31px]"></img>
        {/****************** Mobile navbar **************/}
        < div
          onClick={toggleMobileOptions}
          className="w-[33px] h-[20px] flex flex-col gap-y-1 lg:hidden cursor-pointer relative"
        >
          <div className={`absolute w-full h-[3px] bg-primary-500 ease-in-out duration-200 transition ${isHeaderOpen ? "!rotate-45 top-2" : ""}`}></div>
          <div className={`absolute w-full h-[3px] bg-primary-500 ease-in-out duration-200 transition rotate-0 top-2 ${isHeaderOpen ? "!hidden" : ""}`}></div>
          <div className={`absolute w-full h-[3px] bg-primary-500 ease-in-out duration-200 transition rotate-0 top-4 ${isHeaderOpen ? "!-rotate-45 !top-2" : ""}`}></div>
        </div>

        {/****************** Desktop navbar **************/}
        {!isContactUs && !isMediaPage ?
          <nav className='gap-x-[20px] items-center py-10 font-Bebas hidden lg:flex lg:flex-row'>
            <a
              href='#events'
              className=' text-primary-600 text-[27px]'
            >Events</a>
            <Link
              href='/media'
              className='text-primary-600 text-[27px]'
            >Recaps</Link>
            <a
              href='#about-us'
              className=' text-primary-600 text-[27px]'
            >About Us</a>
            <a
              href='#articles'
              className=' text-primary-600 text-[27px]'
            >Articles</a>
            <Link
              href='/contact'
              className=' text-primary-600 text-[27px]'
            >Contact</Link>
          </nav> : isContactUs ?
            <nav className='gap-x-[20px] items-center py-10 font-Bebas hidden lg:flex lg:flex-row'>
              <Link
                href='/media'
                className='text-primary-600 text-[27px]'
              >Recaps</Link>
              <Link
                href='/'
                className=' text-primary-600 text-[27px]'
              >Home</Link>
            </nav> : <nav className='gap-x-[20px] items-center py-10 font-Bebas hidden lg:flex lg:flex-row'>
              <Link
                href='/contact'
                className=' text-primary-600 text-[27px]'
              >Contact</Link>
              <Link
                href='/'
                className=' text-primary-600 text-[27px]'
              >Home</Link>
            </nav>
        }
      </header>

      {
        isHeaderOpen && !isContactUs && !isMediaPage ?
          <nav className='bg-background h-[100dvh] min-h-screen w-screen absolute z-20 top-[calc(100px)] flex flex-col gap-y-[20px] items-center py-10'>
            <a
              href='#events'
              onClick={() => toggleMobileOptions()}
              className='font-Bebas font-semibold text-primary-600 text-[27px]'
            >Events</a>
            <Link
              href='/media'
              onClick={() => toggleMobileOptions()}
              className='font-Bebas font-semibold text-primary-600 text-[27px]'
            >Recaps</Link>
            <a
              href='#about-us'
              onClick={() => toggleMobileOptions()}
              className='font-Bebas font-semibold text-primary-600 text-[27px]'
            >About DKMediaHG</a>
            <a
              href='#articles'
              onClick={() => toggleMobileOptions()}
              className='font-Bebas font-semibold text-primary-600 text-[27px]'
            >Articles</a>
            <Link
              href='/contact'
              onClick={() => toggleMobileOptions()}
              className='font-Bebas font-semibold text-primary-600 text-[27px]'
            >Contact us</Link>
            <div
              onClick={() => onSubscribeClick()}
              className='font-Bebas font-semibold text-primary-600 text-[27px]'
            >Join our newsletter</div>
          </nav> : isHeaderOpen && isContactUs ?
            <nav className='bg-background h-[100dvh] min-h-screen w-screen absolute z-20 top-[calc(100px)] flex flex-col gap-y-[20px] items-center py-10'>
              <Link
                href='/media'
                onClick={() => toggleMobileOptions()}
                className='font-Bebas font-semibold text-primary-600 text-[27px]'
              >Recaps</Link>
              <Link
                href='/'
                onClick={() => toggleMobileOptions()}
                className='font-Bebas font-semibold text-primary-600 text-[27px]'
              >Home</Link>
            </nav> : isHeaderOpen && isMediaPage ?
              <nav className='bg-background h-[100dvh] min-h-screen w-screen absolute z-20 top-[calc(100px)] flex flex-col gap-y-[20px] items-center py-10'>
                <Link
                  href='/contact'
                  onClick={() => toggleMobileOptions()}
                  className='font-Bebas font-semibold text-primary-600 text-[27px]'
                >Contact</Link>
                <Link
                  href='/'
                  onClick={() => toggleMobileOptions()}
                  className='font-Bebas font-semibold text-primary-600 text-[27px]'
                >Home</Link>
              </nav> : <></>
      }
    </>

  )
}
