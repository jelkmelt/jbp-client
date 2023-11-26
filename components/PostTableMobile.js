import React from 'react';

const PostTableMobile = ({ posts }) => {
  return (
    <div className="md:hidden">
      {posts?.length === 0 ? (
        <div>
          <h4 className="text-center">No Post Yet</h4>
        </div>
      ) : (
        <div>
          <div className="flex justify-center mt-5">
            <h1 className="text-xl font-semibold text-center border-b border-gray-400">
              Posts
            </h1>
          </div>
          {posts?.map(item => (
            <div key={item._id} className="my-2">
              <div className="flex gap-1 justify-between">
                <h1 className="whitespace-nowrap overflow-hidden text-ellipsis font-semibold text-lg underline">
                  {item?.title}
                </h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostTableMobile;
