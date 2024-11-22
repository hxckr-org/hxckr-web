import React, { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { allDocuments } from "contentlayer/generated";
import useCreateRepo from "@/hooks/useCreateRepo";
import Button from "../primitives/button";
import { useRouter } from "next/navigation";

const MdxButton = ({
  title,
  link,
  children,
}: {
  title: string;
  link: string;
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const baseCourseTitle =
    "/" + pathname.split("/challenges/")[1].split("/")[0] + "/instructions";

  console.log({ baseCourseTitle });

  const courses = allDocuments;
  const sluggify = (str: string) => str.toLowerCase().replaceAll(" ", "-");
  const frontmatter = allDocuments.find(
    (doc) => sluggify(doc.url) === baseCourseTitle
  );
  console.log("frontmatter", frontmatter);

  const language = searchParams.get("language");
  const proficiency = searchParams.get("proficiency");
  const frequency = searchParams.get("frequency");
  const rid = searchParams.get("rid");

  const languageMatch = Object.entries(frontmatter?.starterCode || {})
    .filter(([key, value]) => {
      return key.toLowerCase() === language?.toLowerCase();
    })
    .map(([key, value]) => value);

  console.log("languageMatch", languageMatch);

  const {
    mutate: createRepo,
    isPending: isCreatingRepo,
    data: repo,
  } = useCreateRepo(languageMatch[0] as string);
  console.log("repo", repo);

  const handleCreateRepo = useCallback(() => {
    createRepo();
  }, []);

  const disabled = !language || !proficiency || !frequency;

  const currentRouteArray = pathname.split("/");
  const nextModule = link
    .split("/")
    .find((item, idx) => item.includes("module"));
  const clx = currentRouteArray.find((item) => item.includes("module"));
  let newLink = pathname;

  if (clx && nextModule) {
    const newLinkArray = currentRouteArray.map((item, idx) => {
      if (item === clx) {
        return nextModule;
      }
      return item;
    });
    newLink = newLinkArray.join("/") + "?" + `rid=${repo?.id || ""}`;
  }

  return (
    <div className="flex items-end justify-end w-full pb-6">
      <Button
        // href={newLink}
        onClick={() => {
          router.push(newLink);
        }}
        className={`bg-purple-primary text-sm px-5 py-3 flex items-center gap-2 rounded-full font-normal hover:bg-purple-primary/90 text-white w-fit ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {title}
      </Button>
    </div>
  );
};

export default MdxButton;
