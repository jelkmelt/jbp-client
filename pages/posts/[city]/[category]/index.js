import Link from "next/link";
import { API_URL } from "@/config";
import { allCitiesLinks } from "@/static/links/allCitiesLinks";
import { allCategoriesLinks } from "@/static/links/allCategoriesLinks";

const showPostList = ({ posts, params }) => {
  if (posts.data.length < 1) {
    return <p className="my-10 text-lg">No posts found</p>;
  }

  return (
    <div className="min-h-[70vh] py-2">
      {posts.data.length > 0 &&
        posts.data.map((item) => (
          <div
            key={item._id}
            className="py-2.5 border-b last:border-b-0 border-gray-300"
          >
            <Link
              href={`/posts/${params.city}/${params.category}/${item._id}`}
              target="_blank"
              className="hover:underline hover:text-yellow-600"
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default showPostList;

export async function getServerSideProps(context) {
  const { params } = context;

  if (
    !allCitiesLinks.includes(params.city) ||
    !allCategoriesLinks.includes(params.category)
  ) {
    return {
      notFound: true,
    };
  }

  const url = `${API_URL}/get/data/${params.category}/${params.city}`;

  const res = await fetch(url);

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const posts = await res.json();

  // console.log("posts", posts);

  return {
    props: {
      posts,
      params,
    },
  };
}
