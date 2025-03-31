import { AboutUsProps } from '@/lib/interfaces/props/AboutUsProps';

export default function AbousUs(props: AboutUsProps) {
  const { aboutUs } = props;
  return (<section id='about-us' className='relative w-full flex-wrap mt-5 bg-section px-[20px] lg:px-[40px] lg:py-[20px]'>
    <h2 className='h2-small lg:hidden'>{aboutUs?.title}</h2>
    <h2 className='h2-large lg:block hidden'>{aboutUs?.title}</h2>

    <article className='w-full flex flex-col gap-y-4 pb-4 lg:text-[24px] lg:gap-y-6'>
      {
        aboutUs?.paragraphs.map((element, index) => (
          <p key={index}>{element}</p>
        ))
      }
    </article>
  </section>)

}
