import React, { ReactNode } from "react";
import LinkCollection from "components/TagsCollection/Link";

import { TAGS } from "data/daos";
import { useRouter } from "next/router";

const Base = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { symbol } = router.query;
  return (
    <div className="flex flex-col gap-6">
      <LinkCollection tags={TAGS.tags} symbol={symbol?.toString() || ""} />
      {children}
    </div>
  );
};

export default Base;
