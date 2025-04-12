import IMedia from '@/lib/interfaces/IMedia';
import Recaps from '../Recaps';
import MediaService from '@/services/MediaService';

export default async function RecapsPage() {
  const mediaService = new MediaService();
  let allMedia: IMedia[] = [];

  try {
    allMedia = await mediaService.getAllMedia();;
  } catch (error) {
    console.error("Error fetching media:", error);
    return <p>Failed to load media. Please try again later.</p>;
  }

  return (
    <Recaps
      allRecaps={allMedia}
    />
  );
}