import "keen-slider/keen-slider.min.css";
import {
  KeenSliderInstance,
  KeenSliderPlugin,
  useKeenSlider,
} from "keen-slider/react";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import {
  Application,
  Button,
  CTA,
  PetCardSlider,
  ScrollToTop,
} from "../../components";
import { useLocalStorageState } from "../../utils/use-localstorage";
import { useGetAllPets } from "../Pet/queries";
import { useGetProfile } from "../Signup/queries";
import { useGetPet } from "./queries";

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide?.classList.remove("border-2", "border-blue-500");
      });
    }

    function addActive(idx: number) {
      slider.slides[idx]?.classList.add("border-2", "border-blue-500");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details?.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const PetDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged: (slider) => setCurrentIndex(slider.track.details?.rel),
  });

  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 6,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.moveToIdx((currentIndex + 1) % 5);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [currentIndex, instanceRef]);

  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 4,
      spacing: 10,
    },
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

  const { id } = useParams();

  const { data } = useGetPet(id || "");

  const { data: allPets } = useGetAllPets(1, 20);

  const [showModal, setShowModal] = useState(false);

  const token = useLocalStorageState("token");

  const { data: profile } = useGetProfile(token || "");

  return (
    <main className="mt-14">
      <section className="mb-16">
        <div className="ph-container" ref={containerRef}>
          <div className="grid grid-cols-6 gap-8">
            <div className="col-span-3">
              {/* Main Slider */}
              {data?.images && (
                <div
                  ref={sliderRef}
                  className="keen-slider shadow-md rounded-xl overflow-hidden"
                >
                  {data?.images.map((pet, idx) => (
                    <div key={idx} className="keen-slider__slide">
                      <figure className="ph-figure pt-[50%] relative">
                        <img
                          src={pet}
                          className="ph-image rounded-md shadow-md"
                        />
                      </figure>
                    </div>
                  ))}
                </div>
              )}
              {/* Thumbnail Slider */}
              {data?.images && (
                <div
                  ref={thumbnailRef}
                  className="keen-slider thumbnail mt-4 flex gap-2"
                >
                  {data?.images.map((pet, idx) => (
                    <div
                      key={idx}
                      className={`keen-slider__slide cursor-pointer transition-all duration-300 rounded-lg overflow-hidden max-w-[100px] ${
                        currentIndex === idx
                          ? "border-2 border-[#f16849]"
                          : "border border-gray-300"
                      }`}
                    >
                      <figure className="ph-figure pt-[100%]">
                        <img
                          src={pet}
                          className="ph-image rounded-md duration-200 hover:scale-105"
                        />
                      </figure>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-span-3">
              <h2 className="ph-heading--three">{data?.name}</h2>
              <div className="mb-4 text-[#f16849]">{data?.breed}</div>
              <div className="ph-text-x-large mb-4">{data?.age} Years Old</div>
              <p>{data?.healthStatus}</p>

              {data?.adoptionStatus === "AVAILABLE" ? (
                <Button
                  label="Adopt Now"
                  variant="primary"
                  classNames="mt-10"
                  onClick={() => setShowModal(true)}
                />
              ) : (
                <Button
                  label="Adopted"
                  variant="primary"
                  classNames="mt-10 pointer-events-none cursor-not-allowed"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <div className="ph-container">
          <h2 className="ph-heading--three mb-6">View similar pets</h2>
        </div>

        {allPets?.pets && data && (
          <div
            ref={ref}
            className="keen-slider"
            style={{ paddingLeft: slideOffset, paddingRight: slideOffset }}
          >
            {allPets.pets
              .filter((prev) => prev.species === data.species)
              .filter((prev) => prev.petId !== data.petId)
              .map((pet) => (
                <div
                  className="keen-slider__slide number-slide1"
                  key={pet.petId}
                >
                  <Link to={`/pets/${pet.petId}`}>
                    <PetCardSlider
                      age={pet.age}
                      breed={pet.breed}
                      image={pet.images[0]}
                      name={pet.name}
                    />
                  </Link>
                </div>
              ))}
          </div>
        )}
      </section>

      <CTA />

      <Application
        handleClose={() => setShowModal(false)}
        isModalOpen={showModal}
        petId={id || ""}
        userId={profile?.user.userId || ""}
      />

      <ScrollToTop />
    </main>
  );
};

export default PetDetails;
