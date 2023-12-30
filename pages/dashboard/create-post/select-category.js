import secData from "../../../static/sectionData";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css";
import Link from "next/link";
import { usePostState } from "../../../context/postContext/postState";
import { getCategory } from "../../../context/postContext/postActions";

const SelectCategory = () => {
  const [, postDispatch] = usePostState();
  return (
    <div className="min-h-[70vh] py-5">
      <Accordion collapsible>
        {secData.map((item) => (
          <AccordionItem
            key={item._id}
            className="w-full text-left font-bold text-lg bg-gray-300 mb-1 rounded-md px-3 py-1.5"
          >
            <h3>
              <AccordionButton className="w-full text-left">
                {item.name}
              </AccordionButton>
            </h3>
            <AccordionPanel className="px-2 text-md text-blue-600 font-normal">
              {item.categories.map((cat) => (
                <div key={cat._id}>
                  <Link
                    // href="/dashboard/create-post/post-form"
                    href="/dashboard/create-post/terms"
                    onClick={() => getCategory(postDispatch, cat)}
                  >
                    {cat.displayName}
                  </Link>
                </div>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default SelectCategory;
