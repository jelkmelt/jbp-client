import Link from "next/link";
import { usePostState } from "./../../../context/postContext/postState";
import { getPostTypes } from "../../../context/postContext/postActions";

const SelectType = () => {
  const [, postDispatch] = usePostState();
  return (
    <div className="container min-h-[70vh] py-5 ">
      <div className="mx-auto">
        <Link
          style={style}
          href="/dashboard/create-post/select-city"
          onClick={() => getPostTypes(postDispatch, "free ad")}
        >
          <h4 className="selectType">Post free ad</h4>
        </Link>
        <Link
          style={style}
          href="/dashboard/create-post/select-city"
          onClick={() => getPostTypes(postDispatch, "local ad")}
        >
          <h4 className="selectType">Post local ad</h4>
        </Link>
        <Link
          style={style}
          href="/dashboard/create-post/select-city"
          onClick={() => getPostTypes(postDispatch, "multiple cities")}
        >
          <h4 className="selectType">Post in multiple cities</h4>
        </Link>
      </div>
    </div>
  );
};
let style = {
  display: "block",
  margin: "10px auto",
  textDecoration: "underline",
  color: "rgb(4 84 64)",
  textAlign: "center",
};

export default SelectType;
