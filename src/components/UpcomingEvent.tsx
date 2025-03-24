"use client"

import { UpcomingEventProps } from '@/interfaces/props/UpcomingEventProps';
import { Suspense, use, useEffect, useRef, useState } from 'react';

export default function UpcomingEvent(props: UpcomingEventProps) {
  const { upcomingEvents,
    upcomingHighlights } = props;

  const images = ["/highlight_background1.JPG", "/highlight_background2.JPG"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentBgImage, setCurrentBgImage] = useState(images[currentIndex]);
  const imageRef = useRef<HTMLImageElement>(null);

  /************ Image slideshow ***************/
  useEffect(() => {
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

  return (
    <section id='events' className="h-fit w-full flex flex-col relative items-center overflow-hidden">
      {/**************** Highlight section ****************/}
      <div className="h-[220px] max-h-[220px] w-full flex flex-col relative items-center overflow-hidden px-6">
        <div className="h-fit w-full flex flex-col top-[30%] relative z-[1]">
          <div className="absolute h-full w-[90%] bg-neutral-900 self-center -top-[30%] blur-xl"></div>
          <div className="text-neutral-200 text-5xl/2 font-bold relative">DKMEDIA<sub className="text-lg">{" "}<br></br>Hospitality Group</sub></div>
        </div>
        <img ref={imageRef} className="absolute h-full w-full z-0 transition ease-in-out duration-200" src={currentBgImage}></img>
      </div>

      {/**************** All events section ****************/}
      <div className='relative flex flex-col w-full mt-10'>
        <Suspense fallback={<div>Loading...</div>}>
          {
            upcomingEvents?.map(element => (
              <div key={element?._id}> {element?.title}</div>
            ))
          }
        </Suspense>
      </div>
    </section>


  );
}