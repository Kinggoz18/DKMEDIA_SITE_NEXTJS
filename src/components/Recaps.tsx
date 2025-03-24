"use client"
import { mediaType } from '@/enums/mediaType';
import { RecapsProps } from '@/interfaces/props/RecapsProps'
import Image from 'next/image';
import React from 'react'

export default function Recaps(props: RecapsProps) {
  const { allRecaps } = props;
  return (<section className='w-full flex flex-row flex-wrap mt-10'>
    {
      allRecaps.map((element, index) => {
        if (element?.mediaType === mediaType.Image) {
          return <Image key={element?._id} src={element?.mediaLink} alt={`Media recap ${index}`} width="220" height="240"/>
        } else if (element?.mediaType === mediaType.Video) {
          return <video
            key={element?._id}
            width="220"
            height="240"
            controls
            preload="auto"
            playsInline
            >
            <source src={element?.mediaLink} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        }
      })
    }
  </section>)

}
