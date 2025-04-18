import dayjs from "dayjs";
import { FaImages } from "react-icons/fa6";
import { MdOutlineMenuBook } from "react-icons/md";
import { Button } from "../../components";
import { useLocalStorageState } from "../../utils/use-localstorage";
import { useGetProfile } from "../Signup/queries";

export const Profile = () => {
  const token = useLocalStorageState("token");

  const { data } = useGetProfile(token || "");

  return (
    <section className="mt-14 mb-20">
      <div className="ph-container mb-20">
        <div className="grid grid-cols-12">
          <div className="col-span-6 col-start-3">
            <div className="grid grid-cols-2 gap-8 items-center">
              <div className="rounded-3xl overflow-hidden relative h-full">
                {/* <figure className="ph-figure pt-[100%]">
                  <img src="/dog.webp" alt="" className="ph-image" />
                </figure> */}

                <div className="bg-[#FFCDC1] absolute w-full h-full inset-0 flex items-center justify-center">
                  <span className="text-9xl font-bold">
                    {data?.user.firstName[0]}
                  </span>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <p className="text-xl font-bold">Name:</p>
                  <p className="text-lg">
                    {data?.user.firstName} {data?.user.lastName}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-xl font-bold">Email:</p>
                  <p className="text-lg">{data?.user.email}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xl font-bold">Phone:</p>
                  <p className="text-lg">{data?.user.phoneNumber}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xl font-bold">DOB:</p>
                  <p className="text-lg">
                    {dayjs(data?.user.dateOfBirth).format("DD MMM, YYYY")}
                  </p>
                </div>
              </div>

              <div className="">
                <Button
                  label={
                    <div className="flex items-center gap-3">
                      <FaImages size={20} />
                      <span>Upload your image</span>
                    </div>
                  }
                  variant="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ph-container mb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="ph-heading--three text-[#F16849]">Your stories</h2>
          <Button
            label={
              <div className="flex items-center gap-3">
                <MdOutlineMenuBook size={20} />
                <span>Add new story</span>
              </div>
            }
            variant="secondary"
          />
        </div>
        <div className="grid grid-cols-12"></div>
      </div>

      <div className="ph-container mb-20">
        <h2 className="mb-8 ph-heading--three text-[#F16849]">
          Recommended pets for you
        </h2>
        <div className="grid grid-cols-12"></div>
      </div>
    </section>
  );
};
