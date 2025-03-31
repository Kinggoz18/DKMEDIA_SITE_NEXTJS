
import Header from "@/components/Header";
import Newsletter from "@/components/Newsletter";
import AboutUsPage from "@/components/server/AboutUs.server";
import ArticlesPage from "@/components/server/Articles.server";
import ContactPage from "@/components/server/Contact.server";
import RecapsPage from "@/components/server/Recaps.server";
import UpcomingEventPage from "@/components/server/UpcomingEvent.server";

export default async function HomePage() {

  return (
    <>
      {/*********** Header here ***************/}
      <Header />
      <main className="bg-background w-[100dvw] relative grid grid-flow-row gap-y-[20px]">
        <Newsletter />
        {/* <main className="bg-background h-[calc(100dvh_-_100px)] top-[calc(100px)] w-screen relative overflow-scroll flex flex-col"> */}
        {/*********************** Upcoming events section **************************/}
        <UpcomingEventPage />

        {/************************** Recaps section **************************/}
        <RecapsPage />

        {/************************** About DK media **************************/}
        <AboutUsPage />

        {/************************** Articles **************************/}
        <ArticlesPage />
      </main>
      {/*********** Footer & contact ***************/}
      <ContactPage />
    </>
  )
}
