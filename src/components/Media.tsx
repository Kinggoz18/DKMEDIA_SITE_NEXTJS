'use client'

import { mediaType } from "@/lib/enums/mediaType";
import MediaPageProps from "@/lib/interfaces/props/MediaPageProps";
import Image from "next/image";
import { useState } from "react";

export default function Media(props: MediaPageProps) {
  const { allMedia } = props;

  const [isPictures, setIsPictures] = useState(true);
  const [isBoth, setIsBoth] = useState(true);

  function handleToggleSection() {
    setIsPictures(!isPictures)
  }

  return (
    <section className="bg-background w-full h-full relative grid grid-flow-row justify-center overflow-hidden pb-[190px]">
      <div className="w-full absolute h-fit">
        <h2 className='h2-small lg:hidden py-[20px] px-[40px] w-full'>Our Recaps</h2>
        <h2 className='h2-large lg:block hidden py-[20px] px-[40px] w-full'>Our Recaps</h2>

        <div className="pl-[40px] flex flex-row gap-x-3 font-Palanquin text-[24px] text-primary-600">
          <span onClick={() => { setIsBoth(true); }} className="cursor-pointer">All</span>
          <span onClick={() => { setIsBoth(false); setIsPictures(true) }} className="cursor-pointer">Images</span>
          <span onClick={() => { setIsBoth(false); setIsPictures(false) }} className="cursor-pointer">Videos</span>
        </div>
      </div>


      {/**************** Mobile screen ******************/}
      <div className="relative w-[100dvw] h-[calc(100vh_-_140px)] pb-[30px] top-[180px] overflow-hidden overflow-y-scroll grid grid-cols-[repeat(auto-fill,minmax(140px,140px))] gap-[16px] justify-center items-start content-start lg:hidden">
        {
          isBoth ? allMedia.map((element, index) => {
            if (element?.mediaType === mediaType.Image) {
              return <Image key={element?._id} src={element?.mediaLink} alt={`Media recap ${index}`} width={160} height={160} className="max-h-[140px] h-[140px] w-[140px] max-w-[140px] object-cover" layout='fixed' />
            } else if (element?.mediaType === mediaType.Video) {
              return <video
                key={element?._id}
                controls
                preload="auto"
                playsInline
                muted={false}
                className="max-h-[140px] h-[140px] w-[140px] max-w-[140px] object-cover"
              >
                <source src={element?.mediaLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            }
          }) : allMedia.map((element, index) => {
            if (element?.mediaType === mediaType.Image && isPictures) {
              return <Image key={element?._id} src={element?.mediaLink} alt={`Media recap ${index}`} width={160} height={160} className="max-h-[140px] h-[140px] w-[140px] max-w-[140px] object-cover" layout='fixed' />
            } else if (!isPictures && element?.mediaType === mediaType.Video) {
              return <video
                key={element?._id}
                controls
                preload="auto"
                playsInline
                muted={false}
                className="max-h-[140px] h-[140px] w-[140px] max-w-[140px] object-cover"
              >
                <source src={element?.mediaLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            }
          })
        }
      </div>

      {/**************** Desktop screen ******************/}
      <div className="hidden relative w-[100dvw] h-[calc(100vh_-_140px)] top-[180px] pb-[30px] overflow-hidden overflow-y-scroll lg:grid lg:grid-cols-[repeat(auto-fill,minmax(400px,400px))] lg:px-[20px] lg:py-[20px] gap-[26px] justify-center items-start content-start">
        {
          isBoth ?
            allMedia.map((element, index) => {
              if (element?.mediaType === mediaType.Image) {
                return <Image key={element?._id} src={element?.mediaLink} alt={`Media recap ${index}`} width={400} height={400} className="object-cover max-h-[400px] max-w-[400px]" layout='fixed' />
              } else if (element?.mediaType === mediaType.Video) {
                return <video
                  key={element?._id}
                  controls
                  preload="auto"
                  playsInline
                  muted={false}
                  className="h-[400px] w-[400px] max-h-[400px] max-w-[400px] object-cover"
                >
                  <source src={element?.mediaLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              }
            }) :
            allMedia.map((element, index) => {
              if (isPictures && element?.mediaType === mediaType.Image) {
                return <Image key={element?._id} src={element?.mediaLink} alt={`Media recap ${index}`} width={400} height={400} className="object-cover max-h-[400px] max-w-[400px]" layout='fixed' />
              } else if (!isPictures && element?.mediaType === mediaType.Video) {
                return <video
                  key={element?._id}
                  controls
                  preload="auto"
                  playsInline
                  muted={false}
                  className="h-[400px] w-[400px] max-h-[400px] max-w-[400px] object-cover"
                >
                  <source src={element?.mediaLink} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              }
            })
        }
      </div>
    </section>
  )
}
