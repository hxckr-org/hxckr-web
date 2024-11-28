"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

import Button from "@/app/components/primitives/button";
import { useStore } from "@/contexts/store";
import { getChallengeDocument } from "@/helpers";
import useCreateRepo from "@/hooks/useCreateRepo";

const MdxButton = ({ title, link }: { title: string; link: string }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { allRepositories } = useStore();

  const baseCourseUrl =
    "/" + pathname.split("/challenges/")[1].split("/")[0] + "/instructions";
  const document = getChallengeDocument({ url: baseCourseUrl });
  const repository = allRepositories.find(
    (repo) => repo?.challenge?.title === document?.title
  );

  const language = searchParams.get("language");
  const proficiency = searchParams.get("proficiency");
  const frequency = searchParams.get("frequency");
  const rid = searchParams.get("rid");

  const languageMatch = Object.entries(document?.starterCode || {})
    .filter(([key, _value]) => {
      return key.toLowerCase() === language?.toLowerCase();
    })
    .map(([_key, value]) => value);
  const currentRouteArray = pathname.split("/");
  const nextModule = link
    .split("/")
    .find((item, _idx) => item.includes("module"));

  const currentModule = currentRouteArray.find((item) =>
    item.includes("module")
  );

  const { mutateAsync: createRepo, isPending: isCreatingRepo } = useCreateRepo({
    repo_url: languageMatch[0] as string,
    callback: async (repoData) => {
      if (currentModule && nextModule) {
        const newLinkArray = currentRouteArray.map((item) => {
          if (item === currentModule) {
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

  React.useEffect(() => {
    if (repository?.id && !rid) {
      const urlParams = new URLSearchParams(searchParams.toString());
      urlParams.set("rid", repository?.id);
      urlParams.set("started", "true");
      urlParams.set("language", language || "");
      urlParams.set("proficiency", proficiency || "");
      urlParams.set("frequency", frequency || "");

      const newPath = `${pathname}?${urlParams.toString()}`;
      router.replace(newPath);
    }
  }, [
    pathname,
    rid,
    router,
    searchParams,
    repository?.id,
    language,
    proficiency,
    frequency,
  ]);

  return (
    <div className="flex items-end justify-end w-full pb-6 mt-8">
      <Button
        disabled={disabled}
        onClick={() => {
          if (repository?.id) {
            if (currentModule && nextModule) {
              const newLinkArray = currentRouteArray.map((item) => {
                if (item === currentModule) {
                  return nextModule;
                }
                return item;
              });

              const urlParams = new URLSearchParams();
              urlParams.set("rid", repository?.id);
              urlParams.set("started", "true");
              urlParams.set("language", language || "");
              urlParams.set("proficiency", proficiency || "");
              urlParams.set("frequency", frequency || "");

              const newLink =
                newLinkArray.join("/") + "?" + urlParams.toString();
              router.push(newLink);
            }
          } else {
            handleCreateRepo();
          }
        }}
        className={`bg-purple-primary text-sm px-10 py-3 flex items-center gap-2 rounded-full font-normal hover:bg-purple-primary/90 text-white w-fit ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {title}
      </Button>
    </div>
  );
};

export default MdxButton;
