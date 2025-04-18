import { Link } from "react-router-dom";
import { Button, ScrollToTop } from "../../components";
import { useVerifyToken } from "../Signup/queries";

export const VerifyEmail = () => {
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const { isPending, isSuccess } = useVerifyToken(token || "");

  return (
    <section className="mt-14 mb-20 h-[40vh]">
      <div className="ph-container">
        <h1 className="ph-heading--three text-center mb-6">
          {isPending
            ? "Verifying"
            : isSuccess
            ? "Your email has been verified 🙂"
            : "Something went wrong"}
        </h1>

        <Link to={"/"} className="w-fit block mx-auto">
          <Button
            label="Go back to homepage"
            classNames="mx-auto"
            variant="primary"
            size="small"
          />
        </Link>
      </div>

      <ScrollToTop />
    </section>
  );
};
