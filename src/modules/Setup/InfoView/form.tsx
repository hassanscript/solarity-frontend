import { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { Container, Button, Stack, Error } from "components/FormComponents";
import { addInfo } from "redux/slices/profileSlice";
import { ProfileFields } from "modules/Profile/UpdateInfoView";
import { setup } from "../../../redux/slices/profileSlice";
import { showErrorToast } from "utils";

const infoFormSchema = yup.object({
  username: yup.string().required(),
  bio: yup.string(),
});

export const Form = () => {
  const dispatch = useDispatch();
  const [usernameStatusCheck, setUsernameStatusCheck] = useState<
    false | true | null
  >(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialValues = {
    username: "",
    bio: "",
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={infoFormSchema}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        setErrorMessage("");
        dispatch(
          setup({
            data: { action: "info", ...data },
            successFunction: () => {},
            errorFunction: (errorMessage: string) => {
              showErrorToast(errorMessage);
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
        isSubmitting: loading,
        handleChange,
        handleBlur,
        resetForm,
        handleSubmit,
        setFieldError,
      }) => {
        const sharedProps = {
          onChange: handleChange,
          onBlur: handleBlur,
          disabled: loading,
          values,
          errors,
          loading,
        };
        return (
          <Container onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <ProfileFields
                setUsernameStatusCheck={setUsernameStatusCheck}
                usernameStatusCheck={usernameStatusCheck}
                sharedProps={sharedProps}
                setFieldError={setFieldError}
              />
              <Error
                description={errorMessage}
                title={"Error on submitting info"}
                show={Boolean(errorMessage)}
                onClick={() => setErrorMessage("")}
              />
              <Stack direction="row" spacing={3} className="ml-auto pt-5">
                <Button
                  variant="accent"
                  outline
                  onClick={() => {
                    resetForm();
                    setUsernameStatusCheck(false);
                  }}
                  disabled={loading}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  loading={loading}
                  disableOnLoading
                  disabled={usernameStatusCheck != true}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </Container>
        );
      }}
    </Formik>
  );
};
