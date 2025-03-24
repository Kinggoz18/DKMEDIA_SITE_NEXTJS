
import Header from "@/components/Header";
import AboutUsPage from "@/components/server/AboutUs.server copy";
import RecapsPage from "@/components/server/Recaps.server";
import UpcomingEventPage from "@/components/server/UpcomingEvent.server";

export default async function HomePage() {

  return (
    <>
      {/*********** Header here ***************/}
      <Header />
      <main className="className='bg-background h-fit w-screen relative flex flex-col top-0">
        {/*********************** Upcoming events section **************************/}
        <UpcomingEventPage />

        {/************************** Recaps section **************************/}
        <RecapsPage />

        {/************************** About DK media **************************/}
        <AboutUsPage />

        {/************************** Articles **************************/}
      </main>
      {/*********** Footer & contact ***************/}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center relative">
        Footer
      </footer>
    </>
  )
}
