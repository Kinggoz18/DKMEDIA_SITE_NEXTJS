import EventContainerProps from '@/lib/interfaces/props/EventContainerProps';
import React from 'react'

const formatDate = (date: string): string => {
  const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  try {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const month = months[newDate.getMonth()];
    const year = newDate.getFullYear()
    return `${month} ${day}, ${year}`
  } catch (error: any) {
    console.log({ error });
    throw new Error(error?.message)
  }
}

export default function HighlightEventContainer(props: EventContainerProps) {
  const {
    title,
    date,
    image,
    priority,
    organizer,
    ticketLink,
    ref } = props;

  const formatedDate = formatDate(date);
  const [newDate, time] = date.split("T");

  return (
    <div className='relative flex flex-col w-[82%] h-fit min-w-[200px] min-h-[427px] items-start gap-y-[15px] duration-900 ease-in-out pb-[20px] md:w-[400px] lg:w-[505px]' ref={ref}>
      {/* <div className='relative w-[90%]'>
        <h3 className='h3-small w-full text-wrap text-left'>{title}</h3>
        <h4 className='h4-small'>{formatedDate}</h4>
      </div> */}

      <img src={image} alt={`Event ${title} image`} className='relative w-full h-[260px] md:h-[400px] md:w-[400px] lg:h-[505px] lg:w-[505px] ' />

      {/* <div className='flex flex-row gap-x-2 items-center w-full'>
        <img src={image} alt={`${organizer?.name} image`} className='relative w-[60px] h-[60px] rounded-full' />
        <p className='font-Palanquin font-semibold text-[18px] w-[80%] text-ellipsis overflow-hidden whitespace-nowrap text-left'>{organizer?.name}</p>
      </div> */}
    </div>
  )
}
