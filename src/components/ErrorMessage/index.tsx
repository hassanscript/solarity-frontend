import React, { FC } from "react";

const  ErrorMessage: FC<any> = ({
    errorMessage
}: {
    errorMessage: String;
}) => {
    return (
        <div className="alert alert-error shadow-lg w-full">
            <span>{errorMessage}</span>
        </div>
    );
};

export default ErrorMessage;