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
  setLoading: (loading: boolean) => void;
}> = ({ sharedProps, setFieldError, setLoading }) => {
  const [status, setStatus] = useState<1 | 2 | 3>(1);

  const checkUsernameAvailability = () => {
    const { username } = sharedProps.values;
    apiCaller
      .get(`profile/usernameAvailability/${username}`)
      .then(() => {
        setStatus(1);
        setFieldError("username", undefined);
      })
      .catch((err) => {
        const message = getErrorMessage(err);
        setFieldError("username", message);
        setStatus(3);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <FormikInput
      name="username"
      {...sharedProps}
      onChange={(e) => {
        setLoading(true);
        setStatus(2);
        sharedProps.onChange(e);
      }}
      onStopTypingInterval={800}
      onStopTyping={checkUsernameAvailability}
      absoluteElement={
        <div className="absolute top-[50%] right-4 translate-y-[-50%]">
          {status == 1 && <AiFillCheckCircle color="green" />}
          {status == 2 && (
            <AiOutlineLoading3Quarters className="animate-spin" />
          )}
          {status == 3 && <AiFillCloseCircle color="red" />}
        </div>
      }
    />
  );
};

const Form = () => {
  const dispatch = useDispatch();
  1;
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
              <UsernameInput
                sharedProps={sharedProps}
                setFieldError={setFieldError}
                setLoading={(loading) => {
                  setStatus(loading ? "checkingUsername" : undefined);
                }}
              />
              <FormikTextArea name="bio" {...sharedProps} />
              <Stack direction="row" spacing={3} className="pt-5 ml-auto">
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
      <h3 className="font-bold text-2xl pb-5">Update Profile</h3>
      <Form />
    </div>
  );
};

export default UpdateInfoView;
