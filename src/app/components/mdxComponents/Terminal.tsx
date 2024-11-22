import { CommandIcon } from "@/public/assets/icons/command-icon";
import { CopyIcon } from "@radix-ui/react-icons";
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
      .replace(/\$LANGUAGE_SPECIFIC_INSTALL_COMMAND/g, language_specific_install_command || "");
  }

  return (
    <div className='bg-white border border-grey-accent rounded-lg'>
      <div className='bg-grey-card-border p-3 flex items-center justify-between'>
        <section className='flex items-center gap-2'>
          <CommandIcon />
          <p className='text-sm font-medium'>Command Line</p>
        </section>
        <section className=''>
          <button className='flex items-center gap-1 py-2 px-2.5 bg-white rounded border-[1.5px] border-grey-accent'>
            <CopyIcon className='text-purple-primary w-5 h-5' />
            <p className=' text-sm font-light text-grey-tertiary-text'>Copy</p>
          </button>
        </section>
      </div>

      <div className='p-3 text-xs leading-[24px] font-medium tracking-[8%]'>
        <p>repo : {repo_id}</p>
        <p>{repo_url}</p>
        <p>{repo_name}</p>
        <p>{language_specific_install_command}</p>

        <div>{children}</div>
      </div>
    </div>
  );
};
