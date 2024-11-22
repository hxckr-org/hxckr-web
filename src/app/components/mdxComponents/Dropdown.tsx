import React from "react";
import { CaretDownIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Dropdown = ({ children, title, content }: { children: React.ReactNode; title: string; content: string }) => {
  return (
    <div className='border-[1.5px] border-grey-accent bg-white w-full rounded-lg'>
      <section className='flex justify-between items-center p-5 bg-grey-card-border rounded-t-lg'>
        <p className='text-xl text-[#000000] font-semibold'>{title}</p>
      </section>
      <div>{content}</div>
      <div>{children}</div>
    </div>
  );
};

export const DropdownItem = ({ children, title, content, tag }: { children: React.ReactNode; title: string; content: string; tag: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropDownChildrenArray = React.Children.toArray(children);

  const saveItem = (key: string, value: string) => {
    urlParams.set(key, value);
    router.push(pathname + "?" + urlParams.toString());
    setIsOpen(true);
  };

  const language = searchParams.get("language") ?? "";
  const proficiency = searchParams.get("proficiency") ?? "";
  const frequency = searchParams.get("frequency") ?? "";

  const selectedState: Record<string, string> = {
    language,
    proficiency,
    frequency,
  };

  const selectedItem = selectedState[tag];

  return (
    <div className='p-5 border-b border-b-grey-accent cursor-pointer'>
      <section className='flex justify-between items-center' onClick={() => setIsOpen(!isOpen)}>
        <section className='flex items-center gap-2'>
          <p className={`${isOpen ? "text-purple-primary" : "text-black"} text-base font-semibold `}>{title}</p>

          {selectedItem && (
            <span className='flex items-center gap-2'>
              <CheckCircledIcon className='w-6 h-6 text-green-primary' />
              <p className='capitalize text-green-primary text-base font-bold italic font-p22mackinac'>{selectedItem}</p>
            </span>
          )}
        </section>
        <CaretDownIcon className='w-6 h-6' />
      </section>

      {isOpen && (
        <section className='pt-2 flex flex-col gap-4'>
          <p className='text-sm font-light text-grey-secondary-text'>{content}</p>
          <div className='flex gap-3'>
            {(dropDownChildrenArray as React.ReactElement[]).map((item, idx) => (
              <button
                key={idx}
                onClick={() => saveItem(tag.toLowerCase(), item?.props?.children.toLowerCase())}
                className='border border-grey-accent bg-grey-button-text w-fit italic text-base font-medium py-1.5 px-4 rounded font-p22mackinac text-grey-tertiary-text'
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
