import secData from "../sectionData";

export const allCategoriesLinks = secData.flatMap((sec) =>
  sec.categories.flatMap((category) => category.routeLink)
);
