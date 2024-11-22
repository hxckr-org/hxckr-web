import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);
  const repo_id = urlParams.get("rid");

  let content = children?.toString() || "";
  
  // Replace placeholder variables with actual values
  if (repo_url && repo_name) {
    content = content
      .replace(/\$REPOSITORY_URL/g, repo_url)
      .replace(/\$REPOSITORY_NAME/g, repo_name?.split("/").pop()?.replace(".git", "") || "")
      .replace(
        /\$LANGUAGE_SPECIFIC_INSTALL_COMMAND/g,
        language_specific_install_command || ""
      );
  }

  return (
    <div className="bg-black text-white p-4 rounded-lg">
        <p>repo : {repo_id}</p>
      <p>{repo_url}</p>
      <p>{repo_name}</p>
      <p>{language_specific_install_command}</p>
    </div>
  );
};
