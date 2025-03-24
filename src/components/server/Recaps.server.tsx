import Recaps from '../Recaps';
import MediaService from '@/services/MediaService';

export default async function RecapsPage() {
  const mediaService = new MediaService();
  const allMedia = await mediaService.getAllMedia();

  console.log({ allMedia });

  return (
    <Recaps
      allRecaps={allMedia}
    />
  );
}