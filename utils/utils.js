export const sortByName = (a, b) => {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};
// get 64 base
export function getBase64(file, cb, id) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(x => ({
      ...x,
      images: [
        ...x.images,
        {
          id,
          imageData: reader.result,
          displayImage: URL.createObjectURL(file),
        },
      ],
    }));
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}
