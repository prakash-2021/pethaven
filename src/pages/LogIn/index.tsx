import { Button, ScrollToTop, TextInput } from "../../components";

export const Login = () => {
  return (
    <section className="mt-14 mb-20">
      <div className="ph-container">
        <h1 className="ph-heading--three text-center mb-6">Log In</h1>

        <p className="text-center mb-8">
          Log into your account here. If you've never logged in before, we'll
          automatically create an account for you.
        </p>

        <div className="max-w-[400px] mx-auto mb-8">
          <TextInput
            placeholder="Enter your email address"
            type="email"
            label="Email address
          "
          />
        </div>

        <Button label="Login" classNames="mx-auto" variant="secondary" />
      </div>

      <ScrollToTop />
    </section>
  );
};
