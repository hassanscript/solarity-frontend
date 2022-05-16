import React from "react";
import { Popover } from "@headlessui/react";
import { CaretDown } from "components/Icons";
import classNames from "classnames";
import { overrideTailwindClasses } from "tailwind-override";
import Link from "next/link";

const SelectInput = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <Popover className="relative">
      <Popover.Button
        className={overrideTailwindClasses(
          classNames(
            "justify-between w-full gap-2 text-sm font-normal normal-case btn rounded-1xl bg-brandblack",
            className
          )
        )}
      >
        {title}
        <CaretDown />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 rounded-lg bg-brandblack">
        <div className="flex flex-col p-5">
          <Link href="/analytics">Analytics</Link>
          <Link href="/engagement">Engagement</Link>
          <Link href="/security">Security</Link>
          <Link href="/integrations">Integrations</Link>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default SelectInput;
