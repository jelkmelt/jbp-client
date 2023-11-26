import Cloudinary from './cloudnary';

const processImage = (images, folder = 'docs') => {
  const imageFile64 = images.map(async item => {
    const { asset_id, public_id, url, secure_url } =
      await Cloudinary.uploader.upload(item, {
        folder: folder,
        timeout: 120000,
      });
    return { asset_id, public_id, url, secure_url };
  });
  return imageFile64;
};
export default processImage;
