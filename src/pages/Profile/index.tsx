import dayjs from "dayjs";
import { useKeenSlider } from "keen-slider/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiExit } from "react-icons/bi";
import { FaImages } from "react-icons/fa6";
import { MdOutlineMenuBook } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { Button, StoryModal } from "../../components";
import { useLocalStorageState } from "../../utils/use-localstorage";
import { useGetProfile } from "../Signup/queries";
import { useGetStoryId } from "./queries";

import relativeTime from "dayjs/plugin/relativeTime";
import StoryCard from "../../components/StoryCard";

dayjs.extend(relativeTime);

export const Profile = () => {
  const token = useLocalStorageState("token");

  const [showModal, setShowModal] = useState(false);

  const { data } = useGetProfile(token || "");

  const navigate = useNavigate();

  const { data: storyData } = useGetStoryId(data?.user.userId || "");

  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 4,
      spacing: 16,
    },
    renderMode: "performance",
  });

  const [containerPadding, setContainerPadding] = useState(0);

  const [slideOffset, setSlideOffset] = useState(0);

  const size = useWindowSize();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setContainerPadding(
        parseFloat(window.getComputedStyle(containerRef.current).paddingLeft)
      );
    }
  }, []);

  useEffect(() => {
    const calcSlideOffset = () => {
      const containerWidth = containerRef.current?.offsetWidth ?? 0;

      if (size.width) {
        const gap = (size.width - containerWidth) / 2 + containerPadding;
        setSlideOffset(gap);
      }
    };

    calcSlideOffset();
  }, [size, containerPadding]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <section className="mt-14 mb-20">
      <div className="ph-container mb-20" ref={containerRef}>
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
            </div>
            <div className="flex gap-8 w-full mt-8">
              <Button
                label={
                  <div className="flex items-center gap-3">
                    <FaImages size={20} />
                    <span>Upload your image</span>
                  </div>
                }
                variant="primary"
              />

              <Button
                label={
                  <div className="flex items-center gap-3">
                    <BiExit size={20} />
                    <span>Log out</span>
                  </div>
                }
                variant="secondary"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                  window.location.reload();
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="ph-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="ph-heading--three text-[#F16849]">Your stories</h2>
            <Button
              label={
                <div className="flex items-center gap-3">
                  <MdOutlineMenuBook size={20} />
                  <span>Add new story</span>
                </div>
              }
              onClick={() => setShowModal(true)}
              variant="secondary"
            />
          </div>
        </div>

        {storyData && (
          <div
            ref={ref}
            className="keen-slider"
            style={{ paddingLeft: slideOffset, paddingRight: slideOffset }}
          >
            {storyData.stories.map((story) => (
              <div key={story.id} className="keen-slider__slide">
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-20">
        <div className="ph-container">
          <h2 className="mb-8 ph-heading--three text-[#F16849]">
            Recommended pets for you
          </h2>
        </div>
      </div>

      <StoryModal
        handleClose={() => setShowModal(false)}
        isModalOpen={showModal}
      />
    </section>
  );
};
