import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, CTA, ScrollToTop, TextInput } from "../../components";
import { useLogin } from "../Signup/queries";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { mutate, isPending, isSuccess, error: serverError } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    mutate(form);
  };

  useEffect(() => {
    if (serverError?.message) {
      setError("Invalid credentials");
    }
  }, [serverError]);

  return (
    <section className="mt-14 mb-20">
      <div className="ph-container mb-20">
        <h1 className="ph-heading--three text-center mb-6">Log In</h1>
        <p className="text-center mb-8">Log into your account here.</p>

        {isSuccess ? (
          <h1 className="ph-heading--three text-center mb-6">
            You're in! Logged in successfully. 🙂
          </h1>
        ) : (
          <>
            <div className="max-w-[400px] mx-auto mb-8">
              <TextInput
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                type="email"
                label="Email address"
              />
            </div>

            <div className="max-w-[400px] mx-auto mb-8">
              <TextInput
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                type="password"
                label="Password"
              />
            </div>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <Button
              label={isPending ? "Logging in..." : "Login"}
              classNames="mx-auto"
              variant="primary"
              onClick={handleSubmit}
            />

            <p className="text-center mb-5 mt-6">
              Don’t have an account?&nbsp;
            </p>

            <Link to={"/signup"}>
              <Button
                label="Sign up"
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
