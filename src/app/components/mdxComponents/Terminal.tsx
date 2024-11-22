import { useGetUserRepositories } from "@/hooks/useGetRepo";
import { CommandIcon } from "@/public/assets/icons/command-icon";
import { ChallengeWithProgress, Repository } from "@/types";
import { CopyIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const Terminal = ({
  children,
  repo_url = "https://github.com/example-repo",
  repo_name = "example-repo",
  language_specific_install_command = "npm install",
}: {
  children: React.ReactNode;
  repo_url?: string;
  repo_name?: string;
  language_specific_install_command?: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);
  const repo_id = urlParams.get("rid");
  const challenge = JSON.parse(
    window.localStorage.getItem("challenge") || "{}"
  ) as ChallengeWithProgress;

  const { data } = useGetUserRepositories({
    id: repo_id || challenge.repository_id,
  });
  const repo = data as Repository;
  const updatedChallenge: ChallengeWithProgress = {
    ...challenge,
    progress: {
      ...challenge.progress,
      current_step: repo?.progress.progress_details.current_step || 0,
      status: repo?.progress.status,
      completion_percentage:
        Math.round(
          (repo?.progress.progress_details.current_step /
            challenge.module_count) *
            100
        ) || 0,
    },
    repository_id: repo?.id,
  };
  useEffect(() => {
    window.localStorage.setItem("challenge", JSON.stringify(updatedChallenge));
    if (!repo_id && updatedChallenge.repository_id) {
      urlParams.set("rid", updatedChallenge.repository_id);
      router.push(pathname + "?" + urlParams.toString());
    }
  }, [updatedChallenge]);

  const repoName = (repo?.soft_serve_url?.split("/").pop() || "").replace(
    ".git",
    ""
  );
  const repoUrl = repo?.repo_url || "";

  let content = React.Children.toArray(children);

  if (repoUrl && repoName) {
    content =
      React.Children.map(children, (child) => {
        if (typeof child === "string") {
          return child
            .replace(/\$REPO_URL/g, repoUrl)
            .replace(/\$REPO_NAME/g, repoName)
            .replace(
              /\$LANGUAGE_SPECIFIC_INSTALL_COMMAND/g,
              language_specific_install_command || ""
            );
        }
        // If it's a React element, try to replace content in its children
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            children:
              typeof child.props.children === "string"
                ? child.props.children
                    .replace(/\$REPO_URL/g, repoUrl)
                    .replace(/\$REPO_NAME/g, repoName)
                    .replace(
                      /\$LANGUAGE_SPECIFIC_INSTALL_COMMAND/g,
                      language_specific_install_command || ""
                    )
                : child.props.children,
          });
        }
        return child;
      }) || [];
  }

  const copyToClipboard = () => {
    const textContent = React.Children.toArray(content)
      .map((child) => {
        if (typeof child === "string") return child;
        if (React.isValidElement(child)) return child.props.children;
        return "";
      })
      .join("");
    navigator.clipboard.writeText(textContent);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div className="bg-white border border-grey-accent rounded-lg">
      <div className="bg-grey-card-border p-3 flex items-center justify-between">
        <section className="flex items-center gap-2">
          <CommandIcon />
          <p className="text-sm font-medium">Command Line</p>
        </section>
        <section className="relative">
          <button
            className="relative flex items-center gap-1 py-2 px-2.5 bg-white rounded border-[1.5px] border-grey-accent"
            onClick={copyToClipboard}
          >
            <CopyIcon className="text-purple-primary w-5 h-5" />
            <p
              className={`text-sm font-light ${
                isCopied ? "text-purple-primary" : "text-grey-tertiary-text"
              }`}
            >
              {isCopied ? "Copied" : "Copy"}
            </p>
          </button>
        </section>
      </div>

      <div className="p-3 text-xs leading-[24px] font-medium tracking-[8%]">
        <code className="text-xs leading-[24px] font-medium tracking-[8%]">
          {content}
        </code>
      </div>
    </div>
  );
};
