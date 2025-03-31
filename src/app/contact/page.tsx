import ContactUs from '@/components/ContactUs';
import Header from '@/components/Header';
import ContactPage from '@/components/server/Contact.server';
import React from 'react'

export default function Contact() {
  return (
    <>
      <Header />
      <ContactUs />
      <ContactPage />
    </>
  )
}
