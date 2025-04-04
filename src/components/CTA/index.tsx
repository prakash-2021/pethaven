import { FaArrowRight } from "react-icons/fa6";
import { Button, TextInput } from "../../components";

export const CTA = () => {
  return (
    <section className="mb-24">
      <div className="ph-container">
        <div className="grid grid-cols-12">
          <div className="col-span-8 col-start-3 bg-[#FFCDC1] py-24 rounded-2xl">
            <div className="flex flex-col items-center">
              <h2 className="ph-heading--three mb-6 text-center">
                Get notified when new pet are released
              </h2>

              <p className="ph-body--small max-w-[800px] mb-16 text-center mx-auto">
                New pets are released periodically in small batches, so the best
                way to get ahold of one is to watch out for our email
                newsletter.
              </p>

              <div className="max-w-[468px] mx-auto mb-12 w-full">
                <TextInput placeholder="Enter your email here" type="email" />
              </div>

              <Button
                label={
                  <div className="flex items-center gap-2">
                    <span>Sign up</span>
                    <FaArrowRight size={20} />
                  </div>
                }
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
