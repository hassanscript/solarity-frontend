import React, { FC } from "react";

const  ErrorMessage: FC<any> = ({
    errorMessage
}: {
    errorMessage: String;
}) => {
    return (
        <div className="alert alert-error shadow-lg w-full mt-2">
            <span>{errorMessage}</span>
        </div>
    );
};

export default ErrorMessage;