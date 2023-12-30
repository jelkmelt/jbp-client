import Link from "next/link";
import { useRouter } from "next/router";
import { allCategoriesLinks } from "@/static/links/allCategoriesLinks";
import { allCitiesLinks } from "@/static/links/allCitiesLinks";

function TermsPage({ query }) {
  const router = useRouter();

  return (
    <div>
      <h1 className="mt-3 text-2xl font-medium">Disclaimer</h1>
      <p className="mt-3">
        This section contains sexual containt.including pictorial nudity adult
        language. It is to be accessed only by persons who are 21 years of age
        or older (and is not considered to be a minor in his/her state of
        residence) and who live in a community or local jurisdiction where nude
        pictures and explicit adult materials are not prohibited by law. By
        accessing this website, you are representing to us that you meet the
        above qualifications. a false representation may be a criminal offense.
      </p>
      <p className="">
        I confirm and represent that I am 21 years of age or older (and am not
        considered to be a minor in my state of residence) and that I am not
        located in a community or local jurisdiction where nude pictures or
        explicit adult materials are prohibited by any Law. I agree to{" "}
        <b>
          report any illegal services or activities which violate the Terms of
          Use.I also agree to report suspected exploitation of minors and/or
          human trafficking
        </b>{" "}
        to appropriate authorities.
      </p>
      <p className="mt-3 font-bold">
        I have read and agree to this disclaimer as well as the{" "}
        <Link href="/terms-of-use" className="text-blue-600 underline">
          Terms of Use
        </Link>
        .
      </p>
      <div className="my-10 flex items-center gap-5">
        <Link
          href={`/posts/${query.city}/${query.category}`}
          className="bg-[#405e8f] text-white px-3 py-1 rounded font-medium"
        >
          I am 21+
        </Link>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-[#405e8f] text-white px-3 py-1 rounded font-medium"
        >
          Exit
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  if (
    !allCitiesLinks.includes(query.city) ||
    !allCategoriesLinks.includes(query.category)
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      query,
    },
  };
}

export default TermsPage;
