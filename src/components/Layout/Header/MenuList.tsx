import React, { FC } from "react";
import Link from "components/Link";
interface IProps {
  items: {
    title: string;
    link: string;
    exact?:boolean
  }[];
}

const MenuList: FC<IProps> = ({ items }) => {
  return (
    <div className="space-x-10 ml-[12vh] pt-3">
      <div className=" hidden sm:block">
        {items.map(({ title, link,exact }) => (
          <Link
            href={link}
            key={link}
            exact={exact}
            className="text-lg hover:py-8 hover:border-secondary mr-5"
            activeClassName="font-bold border-b-2 py-8 border-secondary"
            defaultClassName=""
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
