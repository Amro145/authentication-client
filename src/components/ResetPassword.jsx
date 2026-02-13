import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../store/api";
import Loading from "./Loading";
import Swal from "sweetalert2";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resetPasswordLoading } = useSelector((x) => x.auth);

  const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "password must be at least 8 characters")
      .required("Password is required"),
  });
  return resetPasswordLoading ? (
    <Loading />
  ) : (
    <div className="h-screen flex flex-col gap-4 items-center justify-center ">
      <h1 className="text-4xl text-green-700">Reset Password</h1>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={resetPasswordSchema}
        onSubmit={async (values) => {
          try {
            await dispatch(resetPassword({ id: token, data: values })).unwrap();
            Swal.fire({
              icon: "success",
              title: "Password reset successful!",
              text: "You can now log in with your new password.",
              timer: 3000,
            });
            navigate("/login");
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Failed to reset password",
              text: err.message || "Something went wrong",
            });
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 w-[400px]">
            <div className="flex flex-col gap-2">
              <label htmlFor="password"> Enter New Password</label>
              <Field
                className="border-2 p-1 border-black"
                type="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error text-red-500"
              />
            </div>

            <button
              type="submit"
              className="bg-green-900 p-1 cursor-pointer hover:bg-green-700 duration-200 "
              disabled={isSubmitting}
            >
              Reset
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResetPassword;
