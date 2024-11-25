import { allDocuments } from "contentlayer/generated";

const getLocalStorage = (key: string, defaultValue: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key) || defaultValue;
  }
  return defaultValue;
};

const setLocalStorage = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

const sluggify = (str: string) => str?.toLowerCase()?.replaceAll(" ", "-");

const getChallengeDocument = ({
  title,
  url,
}: {
  title?: string;
  url?: string;
}) => {
  if (title) {
    return allDocuments.find((doc) => sluggify(doc.title) === sluggify(title));
  }
  return allDocuments.find((doc) => doc.url === url);
};

export { getLocalStorage, setLocalStorage, sluggify, getChallengeDocument };
