
import Header from "@/components/Header";
import AboutUsPage from "@/components/server/AboutUs.server";
import ContactPage from "@/components/server/Contact.server";
import RecapsPage from "@/components/server/Recaps.server";
import UpcomingEventPage from "@/components/server/UpcomingEvent.server";

export default async function HomePage() {

  return (
    <>
      {/*********** Header here ***************/}
      <Header />
      {/* <main className="bg-background h-[calc(100dvh_-_100px)] top-[calc(100px)] w-screen relative overflow-scroll"> */}
      <main className="bg-background h-fit top-[calc(100px)] w-screen relative overflow-scroll">
        {/*********************** Upcoming events section **************************/}
        <UpcomingEventPage />

        {/************************** Recaps section **************************/}
        <RecapsPage />

        {/************************** About DK media **************************/}
        <AboutUsPage />

        {/************************** Articles **************************/}
      </main>
      {/*********** Footer & contact ***************/}
      <ContactPage />
    </>
  )
}
