import AboutUsService from '@/services/AboutUsService';
import AbousUs from '../AbousUs';

export default async function AboutUsPage() {
  const aboutUsService = new AboutUsService();
  const aboutUs = await aboutUsService.getAboutUs();

  console.log({ aboutUs });

  return (
    <AbousUs
    aboutUs={aboutUs}
    />
  );
}