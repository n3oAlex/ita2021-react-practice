export const uniqueArrayElementById = <T extends { id: string }>(
  arr: T[],
  el: T | null
) => {
  return el ? arr.some((x) => x?.id === el?.id) : false;
};

export const compareElementsByCategoryString = <T extends { category: string }>(
  a: T,
  b: T
) => (a.category < b.category ? -1 : a.category > b.category ? 1 : 0);
