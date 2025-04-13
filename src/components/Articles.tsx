'use client'
import useIntersectionObserverHook from '@/lib/hooks/IntersectionObserverHook';
import { ArticlesProps } from '@/lib/interfaces/props/ArticlesProps'
import React from 'react'

export default function Articles(props: ArticlesProps) {
  const { articles } = props;

  //Intersection observer hook
  const { elementRef, isVisible } = useIntersectionObserverHook({ threshold: 0.1 })

  return (
    <section id='articles' ref={elementRef} className={`relative w-full flex-wrap bg-background-prime pb-[20px] ${isVisible ? "animate-fade-up animate-duration-[800ms] animate-ease-in delay-100" : "!opacity-0"}`}>
      <h2 className='h2-small lg:hidden py-[20px] px-[20px] w-full'>Articles</h2>
      <h2 className='h2-large lg:block hidden py-[20px] px-[40px] w-full'>Articles</h2>

      <div className='w-full bg-section h-[120px] lg:h-[150px]'>
        <div className='grid grid-flow-col gap-x-4 w-[calc(100vw_-_40px)] overflow-x-scroll overflow-hidden lg:w-[calc(100vw_-_100px)] h-[90%] px-[20px] lg:px-[40px] lg:max-h-[122px]'>
          {articles?.map(element => (
            <a href={element?.link} target="_blank" key={element?._id} className='rounded-lg text-primary-500 min-w-[200px] max-w-[200px] py-3 line-clamp-4 font-Palanquin underline lg:text-xl text-left lg:min-w-[250px]'>
              {element?.title}
            </a>
          ))}
        </div>
      </div>

    </section>
  )
}
