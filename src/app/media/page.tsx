import ContactUs from '@/components/ContactUs';
import Header from '@/components/Header';
import Newsletter from '@/components/Newsletter';
import ContactPage from '@/components/server/Contact.server';
import MediaPage from '@/components/server/Media.server';
import React from 'react'

export default function Contact() {
  return (
    <>
      <Header />
      <main className="bg-section w-[100dvw] relative grid grid-flow-row">
        <Newsletter />
        <MediaPage />
      </main>
      <ContactPage />
    </>
  )
}
