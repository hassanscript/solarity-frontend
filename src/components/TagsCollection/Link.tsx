import React, { FC } from "react";
import Link from "components/Link";

export interface TagsLinkCollectionProps {
  symbol: string;
  tags: {
    label: string;
    link: (symbol: string) => string;
  }[];
}

const TagsCollection: FC<TagsLinkCollectionProps> = ({ tags, symbol }) => {
  console.log(symbol);
  return (
    <div className="flex flex-wrap gap-2 ">
      {tags.map((tag, index) => (
        <Link
          href={tag.link(symbol)}
          key={index}
          exact
          className="text-sm font-normal normal-case rounded-full btn btn-sm h-7"
          defaultClassName="btn-primary"
          activeClassName="btn-secondary"
        >
          <button key={index}>{tag.label}</button>
        </Link>
      ))}
    </div>
  );
};

export default TagsCollection;
