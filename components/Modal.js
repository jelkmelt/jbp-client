import React from 'react';

const Modal = ({ selectedImage, setSelectedImage }) => {
  const handleClick = e => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImage(null);
    }
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-slate-500 backdrop"
      onClick={handleClick}
    >
      <img
        className="block my-[60px] mx-auto"
        src={selectedImage.url}
        alt="enlarged pic"
      />
    </div>
  );
};

export default Modal;
// .backdrop {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.7);
// }
// .backdrop img {
//   display: block;
//   max-width: 60%;
//   max-height: 80%;
//   margin: 60px auto;
//   box-shadow: 3px 5px 7px rgba(0, 0, 0, 0.5);
//   border: 3px solid #fff;
// }
