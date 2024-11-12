import { twMerge } from "tailwind-merge";
import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef } from "react";

export default function AccordionComponent({
  data,
  accordionRootClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
}: {
  data: {
    title: string;
    content: string;
  }[];
  accordionRootClassName?: string;
  accordionItemClassName?: string;
  accordionTriggerClassName?: string;
  accordionContentClassName?: string;
}) {
  return (
    <Accordion.Root
      className={twMerge("w-[624px] rounded-xl", accordionRootClassName)}
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {data.map((item, index) => (
        <AccordionItem
          className={twMerge(
            "mt-px overflow-hidden rounded-2xl focus-within:relative focus-within:z-10",
            accordionItemClassName
          )}
          key={index}
          value={item.title}
        >
          <AccordionTrigger
            className={twMerge(
              "p-5 data-[state=open]:bg-grey-accordion-background",
              accordionTriggerClassName
            )}
          >
            {item.title}
          </AccordionTrigger>
          <AccordionContent
            className={twMerge("p-5", accordionContentClassName)}
          >
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion.Root>
  );
}

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={twMerge(
      "mt-px overflow-hidden rounded-2xl focus-within:relative focus-within:z-10",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={twMerge(
        "group flex flex-1 cursor-default items-center justify-between bg-white text-xl leading-[30px] text-black outline-none",
        "data-[state=open]:bg-grey-accordion-background",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <MinusIcon
        className="text-purple-primary text-[24px] w-[24px] h-[24px] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=closed]:hidden"
        aria-hidden
      />
      <PlusIcon
        className="text-purple-primary text-[24px] w-[24px] h-[24px] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:hidden"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={twMerge(
      "overflow-hidden text-base font-light leading-[30px] text-gray-700 bg-grey-accordion-background data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px]">{children}</div>
  </Accordion.Content>
));

AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionContent.displayName = "AccordionContent";
