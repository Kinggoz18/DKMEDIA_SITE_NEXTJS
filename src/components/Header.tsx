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

  console.log({ path, newsletterStore })

  return (
    <>
      <header className="top-0 w-full p-4 py-8 flex flex-row h-[100px] items-center justify-items-center justify-between">
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
        {!isContactUs ?
          <nav className='gap-x-[20px] items-center py-10 font-Lalezar hidden lg:flex lg:flex-row'>
            <a
              href='#events'
              className=' text-primary-600 text-[25px]'
            >Events</a>
            <a
              href="#recaps"
              className=' text-primary-600 text-[25px]'
            >Recaps</a>
            <a
              href='#about-us'
              className=' text-primary-600 text-[25px]'
            >About Us</a>
            <a
              href='#articles'
              className=' text-primary-600 text-[25px]'
            >Articles</a>
            <Link
              href='/contact'
              className=' text-primary-600 text-[25px]'
            >Contact</Link>
          </nav> :
          <nav className='gap-y-[20px] items-center py-10 font-Lalezar hidden lg:flex lg:flex-row'>
            <Link
              href='/'
              className=' text-primary-600 text-[25px]'
            >Home</Link>
          </nav>
        }
      </header>

      {
        isHeaderOpen && !isContactUs ?
          <nav className='bg-section h-[100dvh] min-h-screen w-screen absolute z-20 top-[calc(100px)] flex flex-col gap-y-[20px] items-center py-10'>
            <a
              href='#events'
              onClick={() => toggleMobileOptions()}
              className='font-Palanquin font-semibold text-primary-600 text-[25px]'
            >Events</a>
            <a
              href="#recaps"
              onClick={() => toggleMobileOptions()}
              className='font-Palanquin font-semibold text-primary-600 text-[25px]'
            >Recaps</a>
            <a
              href='#about-us'
              onClick={() => toggleMobileOptions()}
              className='font-Palanquin font-semibold text-primary-600 text-[25px]'
            >About DKMediaHG</a>
            <a
              href='#articles'
              onClick={() => toggleMobileOptions()}
              className='font-Palanquin font-semibold text-primary-600 text-[25px]'
            >Articles</a>
            <Link
              href='/contact'
              onClick={() => toggleMobileOptions()}
              className='font-Palanquin font-semibold text-primary-600 text-[25px]'
            >Contact us</Link>
            <div
              onClick={() => onSubscribeClick()}
              className='font-Palanquin font-semibold text-primary-600 text-[25px]'
            >Join our newsletter</div>
          </nav> : isHeaderOpen && isContactUs ?
            <nav className='bg-section h-[100dvh] min-h-screen w-screen absolute z-20 top-[calc(100px)] flex flex-col gap-y-[20px] items-center py-10'>
              <Link
                href='/'
                onClick={() => toggleMobileOptions()}
                className='font-Palanquin font-semibold text-primary-600 text-[25px]'
              >Home</Link>
            </nav> : <></>
      }
    </>

  )
}
