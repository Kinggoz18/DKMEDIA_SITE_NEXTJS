"use client"
import { AboutUsProps } from '@/interfaces/props/AboutUsProps';
import React from 'react'

export default function AbousUs(props: AboutUsProps) {
  const { aboutUs } = props;
  return (<section className='w-full flex flex-row flex-wrap mt-10'>
    <h2>{aboutUs?.title}</h2>
    {
      aboutUs?.paragraphs.map((element, index) => (
        <p key={index}>{element}</p>
      ))
    }
  </section>)

}
