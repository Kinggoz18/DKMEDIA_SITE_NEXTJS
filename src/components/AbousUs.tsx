'use client'

import useIntersectionObserverHook from '@/lib/hooks/IntersectionObserverHook';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/reduxHook';
import { AboutUsProps } from '@/lib/interfaces/props/AboutUsProps';
import { setIsNewsletterPopupOpen } from '@/lib/redux/NewsletterSlice';

export default function AbousUs(props: AboutUsProps) {
  const { aboutUs } = props;

  const newsletterStore = useAppSelector(state => state.newsletter);
  const dispatch = useAppDispatch();

  //Intersection observer hook
  const { elementRef, isVisible } = useIntersectionObserverHook({ threshold: 0.1 })

  /**
   * Toggle news letter popup
   */
  function onSubscribeClick() {
    if (!newsletterStore.isOpen) {
      document.location = "#events"
      dispatch(setIsNewsletterPopupOpen(true))
    }
  }


  return (<section ref={elementRef} id='about-us' className={`relative w-full flex-wrap p-[20px] lg:px-[40px] lg:py-[20px] bg-gradient-to-b from-[#0D0D0D] to-[#3A0144] ${isVisible ? "animate-fade-up animate-duration-[800ms] animate-ease-in delay-100" : "!opacity-0"}`}>
    <h2 className='h2-small lg:hidden'>{aboutUs?.title}</h2>
    <h2 className='h2-large lg:block hidden'>{aboutUs?.title}</h2>

    <article className='mt-4 w-full flex flex-col gap-y-4 pb-4 lg:text-[20px] lg:gap-y-6 text-neutral-100 font-Poppins lg:w-[90%]'>
      {
        aboutUs?.paragraphs.map((element, index) => (
          <p key={index}>{element}</p>
        ))
      }
    </article>

    <div className='mt-5 bg-primary-500 px-[24px] py-[14px] font-Bebas text-[22px] cursor-pointer w-fit text-center' onClick={() => onSubscribeClick()}>
      Get Event Updates
    </div>
  </section>)

}
