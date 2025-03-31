import { ArticlesProps } from '@/lib/interfaces/props/ArticlesProps'
import React from 'react'

export default function Articles(props: ArticlesProps) {
  const { articles } = props;

  console.log({ articles })
  return (
    <section id='articles' className='relative w-full flex-wrap mt-5 bg-section px-[20px] pb-[20px] lg:px-[40px] lg:py-[20px]'>
      <h2 className='h2-small lg:hidden'>Articles</h2>
      <h2 className='h2-large lg:block hidden'>Articles</h2>

      <div className='grid grid-flow-col gap-x-4 w-[calc(100vw_-_40px)] overflow-x-scroll overflow-hidden lg:w-[calc(100vw_-_100px)]'>
        {articles?.map(element => (
          <a href={element?.link} target="_blank" key={element?._id} className='rounded-lg bg-neutral-300 text-primary-500 h-[80px] w-[170px] p-3 text-center line-clamp-3'>
            {element?.title}
          </a>
        ))}
      </div>
    </section>
  )
}
