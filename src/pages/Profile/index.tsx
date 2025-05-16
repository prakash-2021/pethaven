import dayjs from "dayjs";
import { useKeenSlider } from "keen-slider/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiExit } from "react-icons/bi";
import { FaImages } from "react-icons/fa6";
import { MdOutlineMenuBook } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { Button, PetCardSlider, StoryModal } from "../../components";
import { useLocalStorageState } from "../../utils/use-localstorage";
import { useGetProfile } from "../Signup/queries";
import {
  useGetApplicationsById,
  useGetStoryId,
  useUploadImage,
} from "./queries";

import { FileInput, Modal } from "@mantine/core";
import relativeTime from "dayjs/plugin/relativeTime";
import StoryCard from "../../components/StoryCard";

dayjs.extend(relativeTime);

export const Profile = () => {
  const token = useLocalStorageState("token");

  const [showModal, setShowModal] = useState(false);

  const { data } = useGetProfile(token || "");

  const navigate = useNavigate();

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 4, // Default number of slides per view
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2, // 2 slides for screens 640px and larger
          spacing: 16,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3, // 3 slides for screens 1024px and larger
          spacing: 16,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 4, // 4 slides for screens 1280px and larger
          spacing: 16,
        },
      },
    },
    renderMode: "performance",
  });

  const { data: storyData } = useGetStoryId(data?.user.userId || "");

  // Re-initialize / update slider on storyData update
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [storyData]);

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

  const [showUploadModal, setShowUploadModal] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    mutate: uploadImage,
    isPending,
    isSuccess,
  } = useUploadImage(data?.user.userId || "");

  const handleUpload = () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      uploadImage(formData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowUploadModal(false);
      setImageFile(null);
    }
  }, [isSuccess]);

  const { data: applicationData } = useGetApplicationsById(
    data?.user.userId || ""
  );

  const [refApplication, instanceRefApplication] =
    useKeenSlider<HTMLDivElement>({
      slides: {
        perView: 1.2, // Default number of slides per view
        spacing: 16,
      },
      breakpoints: {
        "(min-width: 640px)": {
          slides: {
            perView: 2, // 2 slides for screens 640px and larger
            spacing: 16,
          },
        },
        "(min-width: 1024px)": {
          slides: {
            perView: 3, // 3 slides for screens 1024px and larger
            spacing: 16,
          },
        },
        "(min-width: 1280px)": {
          slides: {
            perView: 4, // 4 slides for screens 1280px and larger
            spacing: 16,
          },
        },
      },
      renderMode: "performance",
    });

  useEffect(() => {
    if (instanceRefApplication.current) {
      instanceRefApplication.current.update();
    }
  }, [applicationData]);

  return (
    <section className="mt-14 mb-20">
      <div className="ph-container mb-20" ref={containerRef}>
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="col-span-1 md:col-span-6 md:col-start-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="rounded-3xl overflow-hidden relative h-full">
                {data?.user.image ? (
                  <figure className="ph-figure pt-[100%]">
                    <img src={data?.user.image} alt="" className="ph-image" />
                  </figure>
                ) : (
                  <div className="bg-[#FFCDC1] absolute w-full h-full inset-0 flex items-center justify-center">
                    <span className="text-9xl font-bold">
                      {data?.user.firstName[0]}
                    </span>
                  </div>
                )}
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
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full mt-8">
              <Button
                label={
                  <div className="flex items-center gap-3">
                    <FaImages size={20} />
                    <span>Upload your image</span>
                  </div>
                }
                variant="primary"
                onClick={() => setShowUploadModal(true)}
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

        {storyData?.stories.length ? (
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
        ) : (
          <div className="ph-container">
            <p className="text-lg">You haven't submitted any story yet.</p>
          </div>
        )}
      </div>

      <div className="mb-20">
        <div className="ph-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="ph-heading--three text-[#F16849]">
              Your Applications
            </h2>
          </div>
        </div>

        {applicationData?.length ? (
          <div
            ref={refApplication}
            className="keen-slider"
            style={{ paddingLeft: slideOffset, paddingRight: slideOffset }}
          >
            {applicationData.map((pet) => (
              <div className="keen-slider__slide relative" key={pet.petId}>
                <Link to={`/pets/${pet.pet.petId}`}>
                  <PetCardSlider
                    age={pet.pet.age}
                    breed={pet.pet.breed}
                    image={pet.pet.images[0]}
                    name={pet.pet.name}
                  />
                </Link>

                <span className="absolute top-2 left-2 bg-white p-1 rounded text-sm font-medium text-[#F16849]">
                  {pet.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="ph-container">
            <p className="text-lg">You haven't applied for any pets yet.</p>
          </div>
        )}
      </div>

      <StoryModal
        handleClose={() => setShowModal(false)}
        isModalOpen={showModal}
      />

      <Modal
        opened={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload a new image"
        centered
      >
        <FileInput
          label="Select an image"
          placeholder="Pick image"
          accept="image/*"
          value={imageFile}
          onChange={(file) => setImageFile(file)}
          required
        />

        <Button
          label={isPending ? "Uploading" : "Upload"}
          variant="primary"
          classNames="w-full mt-8"
          size="small"
          onClick={handleUpload}
        />
      </Modal>
    </section>
  );
};
