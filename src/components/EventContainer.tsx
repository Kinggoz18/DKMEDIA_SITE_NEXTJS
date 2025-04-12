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

export default function EventContainer(props: EventContainerProps) {
  const {
    title,
    date,
    image,
    priority,
    organizer,
    ticketLink,
    ref } = props;

  const [newDate, time] = date.split("T");
  const formatedDate = formatDate(newDate);

  function navigateToTicketLink() {
    window.open(
      ticketLink,
      '_blank'
    );
  }

  return (
    <div className='relative flex flex-col w-[82%] h-fit min-w-[200px] min-h-[427px] gap-y-[15px] duration-700 ease-in-out pb-[20px] md:w-[400px] lg:w-[400px] bg-[#111111]/70 items-center py-2 px-1' ref={ref}>
      <div className='relative w-[90%] flex flex-col !font-Poppins items-center h-[120px] justify-center'>
        <h3 className='h3-small w-full text-wrap text-center lg:text-[30px] line-clamp-2 max-h-[100px]'>{title}</h3>
        <h4 className='h4-small flex gap-x-2'>{formatedDate} <span>{time}</span></h4>
      </div>

      <img onClick={() => navigateToTicketLink()} src={image} alt={`Event ${title} image`} className='relative w-full h-[260px] md:h-[400px] md:w-[400px] lg:w-[400px] lg:h-[410px]' />

      <div className='flex flex-row gap-x-2 items-center w-fit max-w-[calc(80%_+_60px)]'>
        <img src={organizer?.logo} alt={`${organizer?.name} image`} className='relative w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full' />
        <p className='font-Poppins font-semibold lg:text-[18px] text-[15px] w-full text-ellipsis overflow-hidden whitespace-nowrap text-left text-neutral-100'>{organizer?.name}</p>
      </div>
    </div>
  )
}
