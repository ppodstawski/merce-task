export const getUrlID = (link: string) => {
  const regex = /(\d+)\/$/;
  const match = link.match(regex);
  return match && match[1];
};
