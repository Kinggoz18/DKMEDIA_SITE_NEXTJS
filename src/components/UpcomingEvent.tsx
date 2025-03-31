"use client"

import { UpcomingEventProps } from '@/lib/interfaces/props/UpcomingEventProps';
import { useEffect, useRef, useState } from 'react';
import EventContainer from './EventContainer';
import NextEventBtn from './NextEventBtn';
import PrevEventBtn from './PrevEventBtn';

export default function UpcomingEvent(props: UpcomingEventProps) {
  /************************************ { States & Variables }  ******************************************************************/
  const { upcomingEvents,
    upcomingHighlights } = props;

  const images = ["/highlight_background1.JPG", "/highlight_background2.JPG"];
  //For the backgound slideshow
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBgImage, setCurrentBgImage] = useState(images[currentIndex]);
  const imageRef = useRef<HTMLImageElement>(null);
  const mobileEventContainerRef = useRef<HTMLDivElement>(null);

  //For mobile screen slideshow
  const [mobileIndex, setMobileIndex] = useState(0);
  const [currentMobileEvent, setCurrentMobileEvent] = useState(upcomingEvents[mobileIndex]);

  /******************************************** { Methods }  ********************************************************************/
  /**
   * Show the next event
   */
  function onNextMobileEvent() {
    setMobileIndex((prevIndex) => {
      const updatedIndex = (prevIndex + 1) % upcomingEvents.length;
      const mobileEventContainer = mobileEventContainerRef.current;
      if (mobileEventContainer) {
        mobileEventContainer.classList.add("!opacity-0");

        setTimeout(() => {
          setCurrentMobileEvent(upcomingEvents[updatedIndex]);
          mobileEventContainer.classList.remove("!opacity-0");
        }, 500);
      }

      return updatedIndex;
    });
  }

  /**
   * Show the previous event
   */
  function onPrevMobileEvent() {
    setMobileIndex((prevIndex) => {
      let updatedIndex = (prevIndex - 1) % upcomingEvents.length;
      const mobileEventContainer = mobileEventContainerRef.current;

      if (updatedIndex < 0) {
        let newStart = upcomingEvents.length - 1;

        if (mobileEventContainer) {
          mobileEventContainer.classList.add("!opacity-0");

          setTimeout(() => {
            setCurrentMobileEvent(upcomingEvents[newStart]);
            mobileEventContainer.classList.remove("!opacity-0");
          }, 500);
        }

        return newStart;
      } else {
        if (mobileEventContainer) {
          mobileEventContainer.classList.add("!opacity-0");

          setTimeout(() => {
            setCurrentMobileEvent(upcomingEvents[updatedIndex]);
            mobileEventContainer.classList.remove("!opacity-0");
          }, 800);
        }
        return updatedIndex;
      }
    });


  }

  /************************************ { UseEffect hooks } ********************************************************************/
  /************ Image slideshow *************************/
  useEffect(() => {

    //TODO: Add logic to only run if the screen side is large
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const updatedIndex = (prevIndex + 1) % images.length;
        const image = imageRef.current;
        if (image) {
          image.classList.add("!opacity-0");

          setTimeout(() => {
            setCurrentBgImage(images[updatedIndex]);
            image.classList.remove("!opacity-0");
          }, 500);
        }

        return updatedIndex;
      });
    }, 10000); // Runs every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  /************** Event mobile slide show *********************/
  // useEffect(() => {

  //   //TODO: Add logic to only run if the screen side less than small
  //   const interval = setInterval(() => {
  //     setMobileIndex((prevIndex) => {
  //       const updatedIndex = (prevIndex + 1) % upcomingEvents.length;
  //       const mobileEventContainer = mobileEventContainerRef.current;
  //       if (mobileEventContainer) {
  //         mobileEventContainer.classList.add("!opacity-0");

  //         setTimeout(() => {
  //           setCurrentMobileEvent(upcomingEvents[updatedIndex]);
  //           mobileEventContainer.classList.remove("!opacity-0");
  //         }, 500);
  //       }

  //       return updatedIndex;
  //     });
  //   }, 15000); // Runs every 10 seconds

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <section id='events' className="min-h-[790px] w-full grid grid-flow-row relative items-center overflow-hidden">
      {/**************** Highlight section ****************/}
      <div className="h-[220px] max-h-[220px] w-full flex flex-col relative items-center overflow-hidden">
        <div className="h-fit w-full flex flex-col top-[30%] relative z-[1] p-4">
          <div className="absolute h-full w-[90%] bg-neutral-900 self-center -top-[30%] blur-2xl"></div>
          <div className="text-neutral-200 text-5xl/2 font-bold relative">DKMEDIA<sub className="text-lg">{" "}<br></br>Hospitality Group</sub></div>
        </div>
        <img ref={imageRef} className="absolute h-full w-full z-0 transition ease-in-out duration-200" src={currentBgImage}></img>
      </div>

      {/**************** All events section ****************/}
      <div className='relative w-full px-[20px] bg-section'>
        <h2 className='h2-small'>Upcoming events</h2>
        {/**************** Mobile display ****************/}
        <div className='relative w-full lg:hidden flex flex-col items-center justify-center' >
          <NextEventBtn onClick={onNextMobileEvent} />
          <EventContainer
            key={currentMobileEvent?._id}
            title={currentMobileEvent?.title}
            date={currentMobileEvent?.date}
            image={currentMobileEvent?.image}
            priority={currentMobileEvent?.priority}
            organizer={currentMobileEvent?.organizer}
            ref={mobileEventContainerRef}
          />

          <PrevEventBtn onClick={onPrevMobileEvent} />
        </div>
      </div>
    </section>


  );
}