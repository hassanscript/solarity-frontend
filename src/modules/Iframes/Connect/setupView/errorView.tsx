import ViewHolder from "../viewHolder";

export const ErrorView = () => {
  return (
    <ViewHolder>
      <div className="alert alert-error shadow-lg w-full">
        <div>
          <div>
            <h3 className="font-bold">Error fetching the setup steps</h3>
            <div className="text-xs">Please try again later</div>
          </div>
        </div>
      </div>
    </ViewHolder>
  );
};
