"use client"
import { mediaType } from '@/lib/enums/mediaType';
import useIntersectionObserverHook from '@/lib/hooks/IntersectionObserverHook';
import { RecapsProps } from '@/lib/interfaces/props/RecapsProps'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

//TODO: Limit the media to 10 and add a button to navigate to a second page that displays everything
export default function Recaps(props: RecapsProps) {
  const { allRecaps } = props;

  const { elementRef, isVisible } = useIntersectionObserverHook({ threshold: 0.1 })

  return (
    <section id='recaps' ref={elementRef} className={`relative h-fit max-h-[calc(100dvh_-_150px)] min-h-[450px] max w-full flex flex-col items-start overflow-hidden bg-background-prime gap-y-[15px]  ${isVisible ? "animate-fade-up animate-duration-[800ms] animate-ease-in delay-100" : "!opacity-0"}`}>
      <div className='flex flex-row w-full justify-between items-center'>
        <h2 className='h2-small lg:hidden w-full bg-background-prime z-1 px-[10px] pt-[20px]'>Our Recaps</h2>
        <h2 className='h2-large lg:block hidden w-full bg-section px-[40px] py-[10px] z-1'>Our Recaps</h2>
      </div>

      <div className="relative w-full max-h-[90%] pb-[30px] overflow-hidden overflow-y-scroll grid grid-cols-[repeat(auto-fill,minmax(10rem,10rem))] gap-[8px] justify-center items-start content-start lg:hidden">
        {
          allRecaps.map((element, index) => {
            //End when 6 elements have been rendered
            if (index > 6) return;

            if (element?.mediaType === mediaType.Image) {
              return <Image key={element?._id} src={element?.mediaLink} alt={`Media recap ${index}`} width={160} height={160} className="cover" layout='fixed' />
            } else if (element?.mediaType === mediaType.Video) {
              return <video
                key={element?._id}
                controls
                preload="auto"
                playsInline
                muted={false}
                className="max-h-[160px] h-[160px] w-[160px] max-w-[450px] object-cover"
              >
                <source src={`${element?.mediaLink}#t=0.1`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            }
          })
        }
      </div>

      <div className="hidden relative w-full max-h-[90%] pb-[30px] overflow-hidden overflow-y-scroll lg:grid lg:grid-cols-[repeat(auto-fill,minmax(400px,400px))] lg:px-[20px] lg:py-[20px]  gap-[26px] justify-center items-start content-start">
        {
          allRecaps.map((element, index) => {
            //End when 6 elements have been rendered
            if (index > 6) return;

            if (element?.mediaType === mediaType.Image) {
              return <Image key={element?._id} src={element?.mediaLink} alt={`Media recap ${index}`} width={400} height={400} className="cover" layout='fixed' />
            } else if (element?.mediaType === mediaType.Video) {
              return <video
                key={element?._id}
                controls
                preload="auto"
                playsInline
                muted={false}
                className="h-[400px] w-[400px] max-h-[400px] max-w-[400px] object-cover"
              >
                <source src={`${element?.mediaLink}#t=0.1`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            }
          })
        }
      </div>

      <div className='w-full flex flex-row justify-end pr-[20px] pb-[20px]'>
        <Link href='/media' className='h4-small text-[17px] lg:hidden text-primary-500 font-bold flex flex-row items-center gap-x-2'>More recaps
          <img src={"/nextIcon.png"} alt="" className='h-[20px]' /></Link>
        <Link href='/media' className='text-2xl hidden text-primary-500 font-bold lg:flex lg:flex-row items-center gap-x-4'>More recaps
          <img src={"/nextIcon.png"} alt="" className='h-[24px]' />
        </Link>
      </div>
    </section>)

}
