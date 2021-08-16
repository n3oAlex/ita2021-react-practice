export const uniqueArrayElementById = <T extends { id: string }>(
  arr: T[],
  el: T | null
) => {
  return el ? arr.some((x) => x?.id === el?.id) : false;
};
