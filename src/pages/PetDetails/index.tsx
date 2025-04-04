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
import { FaArrowRight } from "react-icons/fa6";
import { useWindowSize } from "usehooks-ts";
import { Button, PetCardSlider } from "../../components";

function ThumbnailPlugin(
  mainRef: MutableRefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("border-2", "border-blue-500");
      });
    }

    function addActive(idx: number) {
      slider.slides[idx].classList.add("border-2", "border-blue-500");
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
      addActive(slider.track.details.rel);
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
    slideChanged: (slider) => setCurrentIndex(slider.track.details.rel),
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

  return (
    <main className="mt-14">
      <section className="mb-16">
        <div className="ph-container" ref={containerRef}>
          <div className="grid grid-cols-6 gap-8">
            <div className="col-span-3">
              {/* Main Slider */}
              <div
                ref={sliderRef}
                className="keen-slider shadow-md rounded-xl overflow-hidden"
              >
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="keen-slider__slide">
                    <figure className="ph-figure pt-[50%] relative">
                      <img
                        src="/dog.webp"
                        className="ph-image rounded-md shadow-md"
                      />
                    </figure>
                  </div>
                ))}
              </div>

              {/* Thumbnail Slider */}
              <div
                ref={thumbnailRef}
                className="keen-slider thumbnail mt-4 flex gap-2"
              >
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`keen-slider__slide cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                      currentIndex === idx
                        ? "border-2 border-[#f16849]"
                        : "border border-gray-300"
                    }`}
                  >
                    <figure className="ph-figure pt-[100%]">
                      <img
                        src="/dog.webp"
                        className="ph-image rounded-md duration-200 hover:scale-105"
                      />
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-3">
              <h2 className="ph-heading--three text-">Pepsi</h2>
              <div className="mb-4 text-[#f16849]">Bhote kukur</div>
              <div className="ph-text-x-large mb-4">3 Years Old</div>
              <p>
                {" "}
                Only a limited number of each minymon will be released. You can
                see which pets are up for adoption now, or contact our team to
                design a custom minymon.
              </p>

              <Button label="Adopt Now" variant="primary" classNames="mt-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <div className="ph-container">
          <h2 className="ph-heading--three mb-6">View similar pets</h2>
        </div>

        <div
          ref={ref}
          className="keen-slider"
          style={{ paddingLeft: slideOffset, paddingRight: slideOffset }}
        >
          <div className="keen-slider__slide number-slide1">
            <PetCardSlider
              age={1}
              breed="Lavender"
              image="/dog.webp"
              name="Pepsi"
            />
          </div>

          <div className="keen-slider__slide number-slide1">
            <PetCardSlider
              age={1}
              breed="Lavender"
              image="/dog.webp"
              name="Pepsi"
            />
          </div>
          <div className="keen-slider__slide number-slide1">
            <PetCardSlider
              age={1}
              breed="Lavender"
              image="/dog.webp"
              name="Pepsi"
            />
          </div>

          <div className="keen-slider__slide number-slide1">
            <PetCardSlider
              age={1}
              breed="Lavender"
              image="/dog.webp"
              name="Pepsi"
            />
          </div>
          <div className="keen-slider__slide number-slide1">
            <PetCardSlider
              age={1}
              breed="Lavender"
              image="/dog.webp"
              name="Pepsi"
            />
          </div>
        </div>
      </section>

      <section className="mb-24">
        <div className="ph-container">
          <div className="grid grid-cols-12">
            <div className="col-span-8 col-start-3 bg-[#FFCDC1] py-24 rounded-2xl">
              <div className="flex flex-col items-center">
                <h2 className="ph-heading--three mb-6 text-center">
                  Get notified when new pet are released
                </h2>

                <p className="ph-body--small max-w-[800px] mb-16 text-center mx-auto">
                  New pets are released periodically in small batches, so the
                  best way to get ahold of one is to watch out for our email
                  newsletter.
                </p>

                <input type="text" />

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
    </main>
  );
};

export default PetDetails;
