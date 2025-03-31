"use client"
import { mediaType } from '@/lib/enums/mediaType';
import { RecapsProps } from '@/lib/interfaces/props/RecapsProps'
import Image from 'next/image';
import React from 'react'

//TODO: Limit the media to 10 and add a button to navigate to a second page that displays everything
export default function Recaps(props: RecapsProps) {
  const { allRecaps } = props;

  return (
    <section id='recaps' className="relative h-fit max-h-[calc(100dvh_-_150px)] min-h-[450px] max w-full flex flex-col items-start overflow-hidden bg-section gap-y-[15px] px-[20px]">
      <h2 className='h2-small'>Our recaps</h2>
      <div className="relative w-full max-h-[90%]  pb-[30px] overflow-hidden overflow-y-auto shrink-0 grid grid-cols-[repeat(auto-fill,minmax(10rem,10rem))] gap-[8px] justify-center items-start content-start">
        {
          allRecaps.map((element, index) => {
            if (element?.mediaType === mediaType.Image) {
              return <Image key={element?._id} src={element?.mediaLink} alt={`Media recap ${index}`} width={160} height={160} className="cover" layout='fixed' />
            } else if (element?.mediaType === mediaType.Video) {
              return <video
                key={element?._id}
                width="160"
                height="160"
                controls
                preload="auto"
                playsInline
                muted={false}
                className="max-h-[160px] h-[160px]"
              >
                <source src={element?.mediaLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            }
          })
        }
      </div>
    </section>)

}
