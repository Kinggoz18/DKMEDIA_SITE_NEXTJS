"use client"
import { useState } from 'react';

export default function Header() {
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);

  /**
 * Toggle header open on mobile screen
 */
  function toggleMobileOptions() {
    setIsHeaderOpen(!isHeaderOpen)
  }

  return (
    <>
      <header className="top-0 w-full p-4 py-8 flex flex-row h-[100px] items-center justify-items-center justify-between absolute">
        <img src="/dkMediaLogo.png" className="w-[140px] h-[31px]"></img>
        < div
          onClick={toggleMobileOptions}
          className="w-[33px] h-[20px] flex flex-col gap-y-1 lg:hidden cursor-pointer relative"
        >
          <div className={`absolute w-full h-[3px] bg-primary-500 ease-in-out duration-200 transition ${isHeaderOpen ? "!rotate-45 top-2" : ""}`}></div>
          <div className={`absolute w-full h-[3px] bg-primary-500 ease-in-out duration-200 transition rotate-0 top-2 ${isHeaderOpen ? "!hidden" : ""}`}></div>
          <div className={`absolute w-full h-[3px] bg-primary-500 ease-in-out duration-200 transition rotate-0 top-4 ${isHeaderOpen ? "!-rotate-45 !top-2" : ""}`}></div>
        </div>
      </header>

      {
        isHeaderOpen &&
        <nav className='bg-section h-[100dvh] min-h-screen w-screen absolute z-20 top-[calc(100px)] flex flex-col gap-y-[20px] items-center py-10'>
          <a
            href='#events'
            onClick={() => toggleMobileOptions()}
            className='font-Palanquin font-semibold text-primary-600 text-[25px]'
          >Events</a>
          <a
            href='#recaps'
            onClick={() => toggleMobileOptions()}
            className='font-Palanquin font-semibold text-primary-600 text-[25px]'
          >Recaps</a>
          <a
            href='#about-us'
            onClick={() => toggleMobileOptions()}
            className='font-Palanquin font-semibold text-primary-600 text-[25px]'
          >About DKMediaHG</a>
        </nav>
      }
    </>

  )
}
