import clsx from "clsx";
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
      className={clsx(
        "w-[624px] rounded-xl",
        accordionRootClassName
      )}
      type="single"
      defaultValue="item-1"
      collapsible
    >
      {data.map((item, index) => (
        <AccordionItem
          className={clsx(
            "bg-grey-accordion-background rounded-[16px] border border-grey-accordion-background",
            accordionItemClassName
          )}
          key={index}
          value={item.title}
        >
          <AccordionTrigger className={clsx("p-5 data-[state=open]:bg-grey-accordion-background", accordionTriggerClassName)}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent className={clsx("", accordionContentClassName)}>
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
    className={clsx(
      "mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10",
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
      className={clsx(
        "group flex flex-1 cursor-default items-center justify-between bg-[#111111] text-xl leading-[30px] text-white outline-none",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <MinusIcon
        className="text-[#B3B3B3] text-[24px] w-[24px] h-[24px] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:block"
        aria-hidden
      />
      <PlusIcon
        className="text-[#B3B3B3] text-[24px] w-[24px] h-[24px] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:hidden"
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
    className={clsx(
      "overflow-hidden text-base font-light leading-[30px] text-grey-footer-text data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown",
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="px-5 py-[15px]">{children}</div>
  </Accordion.Content>
));

AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionContent.displayName = "AccordionContent";
