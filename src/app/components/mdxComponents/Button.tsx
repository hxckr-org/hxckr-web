import React, { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { allDocuments } from "contentlayer/generated";
import useCreateRepo from "@/hooks/useCreateRepo";
import Button from "../primitives/button";
import { useRouter } from "next/navigation";
import { ChallengeWithProgress } from "@/types";

const MdxButton = ({ title, link }: { title: string; link: string }) => {
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
  const started = searchParams.get("started");
  const rid = searchParams.get("rid");

  const languageMatch = Object.entries(frontmatter?.starterCode || {})
    .filter(([key, value]) => {
      return key.toLowerCase() === language?.toLowerCase();
    })
    .map(([key, value]) => value);

  console.log("languageMatch", languageMatch);

  const {
    mutateAsync: createRepo,
    isPending: isCreatingRepo,
    error,
  } = useCreateRepo({
    repo_url: languageMatch[0] as string,
    callback: (repoData) => {
      const currentRouteArray = pathname.split("/");
      const nextModule = link
        .split("/")
        .find((item, idx) => item.includes("module"));
      const clx = currentRouteArray.find((item) => item.includes("module"));

      const challenge = JSON.parse(
        window.localStorage.getItem("challenge") || "{}"
      ) as ChallengeWithProgress;
      const updatedChallenge: ChallengeWithProgress = {
        ...challenge,
        repository_id: repoData.id,
      };

      window.localStorage.setItem(
        "challenge",
        JSON.stringify(updatedChallenge)
      );
      if (clx && nextModule) {
        const newLinkArray = currentRouteArray.map((item) => {
          if (item === clx) {
            return nextModule;
          }
          return item;
        });

        const urlParams = new URLSearchParams();
        urlParams.set("rid", repoData.id || "");
        urlParams.set("started", "true");

        const newLink = newLinkArray.join("/") + "?" + urlParams.toString();
        router.push(newLink);
      }
    },
  });

  const handleCreateRepo = useCallback(async () => {
    try {
      await createRepo();
    } catch (err) {
      console.error("Error creating repo:", err);
      alert("Unable to create repository. Please try again.");
    }
  }, [createRepo]);

  const disabled = !language || !proficiency || !frequency || isCreatingRepo;

  return (
    <div className="flex items-end justify-end w-full pb-6">
      <Button
        disabled={disabled}
        onClick={() => {
          handleCreateRepo();
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
