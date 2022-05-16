import React, { FC, useEffect } from "react";

interface SharedProps {
  label?: string;
  placeholder?: string;
  hideLabel?: boolean;
  required?: boolean;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  onStopTyping?: Function;
  onStopTypingInterval?: number;
}

interface InputWrapperProps extends SharedProps {
  name?: string | number | readonly string[] | undefined;
  value?: string | number | readonly string[] | undefined;
}

export const InputWrapper: FC<InputWrapperProps> = ({
  name,
  value,
  label,
  placeholder,
  hideLabel = false,
  error = false,
  helperText = "",
  onStopTyping,
  onStopTypingInterval = 500,
  children,
}) => {
  useEffect(() => {
    if (onStopTyping) {
      const timer = setTimeout(() => {
        onStopTyping();
      }, onStopTypingInterval);
      return () => clearTimeout(timer);
    }
  }, [String(value)]);
  const normalizedName = name
    ?.toString()
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, function (str: string) {
      return str.toUpperCase();
    });
  if (!label) label = normalizedName;
  if (!placeholder) placeholder = normalizedName;
  return (
    <div className="form-control">
      {!hideLabel && label && (
        <label className="label">
          <span className="label-text text-gray-950">{label}</span>
        </label>
      )}
      {children}
      {helperText && (
        <label className="label">
          <span className={`label-text-alt ${error && "text-error"} `}>
            {helperText}
          </span>
        </label>
      )}
    </div>
  );
};

interface InputProps
  extends SharedProps,
    React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  absoluteElement?: React.ReactNode;
}

export const Input: FC<InputProps> = (props) => {
  const { error } = props;
  const className = `input input-bordered input-primary border ${
    error && `input-error`
  }`;
  if (props.absoluteElement) {
    return (
      <InputWrapper {...props}>
        <div className="relative">
          <input {...props} className={className + " w-full"} />
          {props.absoluteElement}
        </div>
      </InputWrapper>
    );
  }
  return (
    <InputWrapper {...props}>
      <input {...props} className={className} />
    </InputWrapper>
  );
};

interface FormikInputProps extends InputProps {
  errors: any;
  values: any;
}

export const FormikInput: FC<FormikInputProps> = ({
  name,
  errors,
  values,
  ...rest
}) => {
  return (
    <Input
      {...rest}
      name={name}
      value={values[name || ""]}
      error={Boolean(errors[name || ""])}
      helperText={errors[name || ""]}
    />
  );
};

interface TextAreaProps
  extends SharedProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export const TextArea: FC<TextAreaProps> = (props) => {
  const { error } = props;
  const className = `textarea textarea-bordered textarea-primary border ${
    error && `textarea-error`
  }`;
  return (
    <InputWrapper {...props}>
      <textarea {...props} className={className} />
    </InputWrapper>
  );
};

interface FormikTextAreaProps extends TextAreaProps {
  errors: any;
  values: any;
}

export const FormikTextArea: FC<FormikTextAreaProps> = ({
  name,
  errors,
  values,
  ...rest
}) => {
  return (
    <TextArea
      {...rest}
      name={name}
      value={values[name || ""]}
      error={Boolean(errors[name || ""])}
      helperText={errors[name || ""]}
    />
  );
};
