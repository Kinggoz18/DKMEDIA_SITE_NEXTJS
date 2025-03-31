"use client"

import { UpcomingEventProps } from '@/lib/interfaces/props/UpcomingEventProps';
import { useEffect, useRef, useState } from 'react';
import EventContainer from './EventContainer';
import NextEventBtn from './NextEventBtn';
import PrevEventBtn from './PrevEventBtn';
import HighlightEventContainer from './HighlightEventContainer';

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
  const highlightEventContainerRef = useRef<HTMLDivElement>(null);

  //For mobile screen slideshow
  const [mobileIndex, setMobileIndex] = useState(0);
  const [currentMobileEvent, setCurrentMobileEvent] = useState(upcomingEvents[mobileIndex]);

  //For desktop screens
  const [highlighyIndex, setHighlighyIndex] = useState(0);
  const [currentHighlightEvent, setCurrentHighlighEvent] = useState(upcomingHighlights[highlighyIndex]);

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

  /**
   * Show the next highlight event
   */
  function onNextHighlightEvent() {
    setHighlighyIndex((prevIndex) => {
      const updatedIndex = (prevIndex + 1) % upcomingHighlights.length;
      const highlightContainer = highlightEventContainerRef.current;
      if (highlightContainer) {
        highlightContainer.classList.add("!opacity-0");

        setTimeout(() => {
          setCurrentHighlighEvent(upcomingHighlights[updatedIndex]);
          highlightContainer.classList.remove("!opacity-0");
        }, 500);
      }

      return updatedIndex;
    });
  }

  /**
   * Show the previous highlight event
   */
  function onPrevHighlightEvent() {
    setHighlighyIndex((prevIndex) => {
      let updatedIndex = (prevIndex - 1) % upcomingHighlights.length;
      const highlightContainer = highlightEventContainerRef.current;

      if (updatedIndex < 0) {
        let newStart = upcomingHighlights.length - 1;

        if (highlightContainer) {
          highlightContainer.classList.add("!opacity-0");

          setTimeout(() => {
            setCurrentHighlighEvent(upcomingHighlights[newStart]);
            highlightContainer.classList.remove("!opacity-0");
          }, 500);
        }

        return newStart;
      } else {
        if (highlightContainer) {
          highlightContainer.classList.add("!opacity-0");

          setTimeout(() => {
            setCurrentHighlighEvent(upcomingHighlights[updatedIndex]);
            highlightContainer.classList.remove("!opacity-0");
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
          setCurrentBgImage(images[updatedIndex]);

          setTimeout(() => {
            image.classList.remove("!opacity-0");
          }, 600);
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
  //         setCurrentMobileEvent(upcomingEvents[updatedIndex]);
  //         setTimeout(() => {

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
      <div className="h-[220px] max-h-[220px] w-full flex flex-col relative items-center overflow-hidden md:h-[300px] md:max-h-[300px] lg:h-[590px] lg:max-h-[590px]">
        <div className="h-fit w-full flex flex-col top-[30%] relative z-[1] p-4 lg:hidden">
          <div className="absolute h-full w-[90%] bg-neutral-900 self-center -top-[30%] blur-2xl"></div>
          <div className="text-neutral-200 text-5xl/2 font-bold relative">DKMEDIA<sub className="text-lg">{" "}<br></br>Hospitality Group</sub></div>
        </div>

        <div className="absolute h-full w-full bg-neutral-900/50 z-[1]"></div>
        <div className='relative w-[800px] hidden lg:flex lg:flex-col items-center justify-center z-[2] top-10' >
          <NextEventBtn onClick={onNextHighlightEvent} />
          <HighlightEventContainer
            key={currentHighlightEvent?._id}
            title={currentHighlightEvent?.title}
            date={currentHighlightEvent?.date}
            image={currentHighlightEvent?.image}
            priority={currentHighlightEvent?.priority}
            organizer={currentHighlightEvent?.organizer}
            ref={highlightEventContainerRef}
          />
          <PrevEventBtn onClick={onPrevHighlightEvent} />
        </div>

        <img ref={imageRef} className="absolute h-full w-full z-0 transition ease-in-out duration-300" src={currentBgImage}></img>
      </div>

      {/**************** All events section ****************/}
      <div className='relative w-full px-[20px] bg-section lg:px-[40px] lg:py-[20px]'>
        <h2 className='h2-small lg:hidden'>Upcoming Events</h2>
        <h2 className='h2-large lg:block hidden'>Upcoming Events</h2>


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

        <div className='relative w-[calc(100vw_-_80px)] hidden lg:grid lg:grid-flow-col items-start justify-start gap-x-14 overflow-hidden overflow-x-scroll' >
          {
            upcomingEvents.map((element) => (
              <EventContainer
                key={element?._id}
                title={element?.title}
                date={element?.date}
                image={element?.image}
                priority={element?.priority}
                organizer={element?.organizer}
              />
            ))
          }
        </div>
      </div>
    </section>


  );
}