import IContact from '@/lib/interfaces/IContact';
import { ContactService } from '@/services/ContactService'
import React from 'react'
import Contact from '../Contact';

export default async function ContactPage() {
  const contactService = new ContactService();
  let contact: IContact;
  try {
    contact = await contactService.getContacts();
  } catch (error: any) {
    console.log({ error });
    return <p>Failed to load contacts. Please try again later.</p>;
  }

  return (
    <Contact contact={contact} />
  )
}
