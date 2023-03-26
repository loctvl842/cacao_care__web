import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";

const EmptyLayout = ({ components }) => {
  return (
    <div>
      {Array.isArray(components)
        ? components.map((c) => <Fragment key={uuidv4()}>{c}</Fragment>)
        : components}
    </div>
  );
};

export default EmptyLayout;
