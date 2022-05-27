import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Container,
  FormikInput,
  FormikTextArea,
  Stack,
} from "components/FormComponents";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { updateProfileInfo } from "redux/slices/profileSlice";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { apiCaller, getErrorMessage } from "utils/fetcher";
import { toast } from "react-toastify";

const UsernameInput: FC<{
  sharedProps: any;
  setFieldError: Function;
  status: true | false | null;
  setStatus: (status: true | false | null) => void;
}> = ({ sharedProps, setFieldError, status, setStatus }) => {
  const checkUsernameAvailability = () => {
    setStatus(null);
    const { username } = sharedProps.values;
    apiCaller
      .get(`profile/usernameAvailability/${username}`)
      .then(() => {
        setStatus(true);
        setFieldError("username", undefined);
      })
      .catch((err) => {
        const message = getErrorMessage(err);
        setFieldError("username", message);
        setStatus(false);
      });
  };

  return (
    <FormikInput
      name="username"
      {...sharedProps}
      onChange={(e) => {
        setStatus(null);
        sharedProps.onChange(e);
      }}
      onStopTypingInterval={800}
      onStopTyping={checkUsernameAvailability}
      absoluteElement={
        <div className="absolute top-[50%] right-4 translate-y-[-50%]">
          {status === true && <AiFillCheckCircle color="green" />}
          {status === null && (
            <AiOutlineLoading3Quarters className="animate-spin" />
          )}
          {status === false && <AiFillCloseCircle color="red" />}
        </div>
      }
    />
  );
};

export const ProfileFields: FC<{
  sharedProps: any;
  setFieldError: any;
  usernameStatusCheck: false | true | null;
  setUsernameStatusCheck: (status: false | true | null) => void;
}> = ({
  sharedProps,
  setFieldError,
  usernameStatusCheck,
  setUsernameStatusCheck,
}) => {
  return (
    <>
      <UsernameInput
        sharedProps={sharedProps}
        setFieldError={setFieldError}
        status={usernameStatusCheck}
        setStatus={setUsernameStatusCheck}
      />
      <FormikTextArea name="bio" {...sharedProps} />
    </>
  );
};

const Form = () => {
  const dispatch = useDispatch();
  const [usernameStatusCheck, setUsernameStatusCheck] = useState<
    false | true | null
  >(false);
  const profileData = useSelector(
    (state: RootStateOrAny) => state.profile.data
  );
  const { username, bio } = profileData;
  const initialValues = {
    username,
    bio,
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      // validationSchema={infoFormSchema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        dispatch(
          updateProfileInfo({
            data,
            successFunction: () => {
              toast.success("Profile info updated");
            },
            errorFunction: () => {
              toast.error("Unable to update profile info");
            },
            finalFunction: () => {
              setSubmitting(false);
            },
          })
        );
      }}
    >
      {({
        values,
        errors,
        status,
        isSubmitting: loading,
        setStatus,
        handleChange,
        handleBlur,
        setFieldError,
        handleSubmit,
      }) => {
        const sharedProps = {
          onChange: handleChange,
          onBlur: handleBlur,
          disabled: loading,
          values,
          errors,
        };

        return (
          <Container onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <ProfileFields
                sharedProps={sharedProps}
                setFieldError={setFieldError}
                setUsernameStatusCheck={setUsernameStatusCheck}
                usernameStatusCheck={usernameStatusCheck}
              />
              <Stack direction="row" spacing={3} className="ml-auto pt-5">
                <Button
                  type="submit"
                  variant="secondary"
                  loading={loading}
                  disabled={status === "checkingUsername"}
                  disableOnLoading
                >
                  Update
                </Button>
              </Stack>
            </Stack>
          </Container>
        );
      }}
    </Formik>
  );
};

const UpdateInfoView = () => {
  return (
    <div>
      <h3 className="pb-5 text-2xl font-bold">Update Profile</h3>
      <Form />
    </div>
  );
};

export default UpdateInfoView;
