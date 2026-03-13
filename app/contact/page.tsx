import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact the MindMesh team. Get support, request a demo or ask about enterprise plans and custom integrations.',
  openGraph: {
    title: 'Contact MindMesh — Get In Touch',
    description:
      'Contact us for support, demos or enterprise inquiries.',
    url: 'https://mindmesh.global/contact',
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
