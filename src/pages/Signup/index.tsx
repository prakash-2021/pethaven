import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, CTA, ScrollToTop, TextInput } from "../../components";
import { useSignUp } from "./queries";

export const SignUp = () => {
  const { mutate, isPending, isSuccess } = useSignUp();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.includes("@")) newErrors.email = "Enter a valid email";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    mutate({ ...form, dateOfBirth: form.dateOfBirth || null });
  };

  return (
    <section className="mt-14 mb-20">
      <div className="ph-container mb-20">
        <h1 className="ph-heading--three text-center mb-6">Sign Up</h1>
        <p className="text-center mb-8">
          {isSuccess
            ? "A verification link has been sent to your email address. Please verify your email."
            : "Create your account here."}
        </p>

        {!isSuccess && (
          <>
            <div className="max-w-[800px] mx-auto mb-8">
              <div className="grid lg:grid-cols-2 gap-6">
                <TextInput
                  name="firstName"
                  placeholder="Enter your first name"
                  type="text"
                  label="First name *"
                  value={form.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />
                <TextInput
                  name="lastName"
                  placeholder="Enter your last name"
                  type="text"
                  label="Last name *"
                  value={form.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />
                <TextInput
                  name="email"
                  placeholder="Enter your email address"
                  type="email"
                  label="Email address *"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <TextInput
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  label="Password *"
                  value={form.password}
                  onChange={handleChange}
                  error={errors.password}
                />
                <TextInput
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  type="number"
                  label="Phone number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                />
                <TextInput
                  name="dateOfBirth"
                  placeholder="Enter your dob"
                  type="date"
                  label="DOB"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  error={errors.dateOfBirth}
                />
              </div>
            </div>

            <Button
              label={isPending ? "Signing Up..." : "Sign Up"}
              classNames="mx-auto"
              variant="primary"
              onClick={handleSubmit}
              // disabled={isPending}
            />

            <p className="text-center mb-5 mt-6">
              Already have an account?&nbsp;
            </p>
            <Link to={"/login"}>
              <Button
                label="Login"
                classNames="mx-auto"
                variant="secondary"
                size="small"
              />
            </Link>
          </>
        )}
      </div>

      <CTA />

      <ScrollToTop />
    </section>
  );
};
