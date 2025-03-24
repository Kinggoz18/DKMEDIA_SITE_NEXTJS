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
    <header className="top-0 w-full p-4 py-8 flex flex-row h-[100px] items-center justify-items-center justify-between relative">
      <img src="/dkMediaLogo.png" className="w-[140px] h-[31px]"></img>
      <div
        onClick={toggleMobileOptions}
        className="w-[33px] h-[20px] flex flex-col gap-y-1 mr-3 md:hidden cursor-pointer relative"
      >
        <div className={`absolute w-full h-[3px] bg-primary-500 ease-in-out duration-200 transition ${isHeaderOpen ? "!rotate-45 top-2" : ""}`}></div>
        <div className={`absolute w-full h-[3px] bg-primary-500 ease-in-out duration-200 transition rotate-0 top-2 ${isHeaderOpen ? "!hidden" : ""}`}></div>
        <div className={`absolute w-full h-[3px] bg-primary-500 ease-in-out duration-200 transition rotate-0 top-4 ${isHeaderOpen ? "!-rotate-45 !top-2" : ""}`}></div>
      </div>
    </header>
  )
}
