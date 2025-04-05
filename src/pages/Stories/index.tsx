import { Button, CTA } from "../../components";

const Stories = () => {
  return (
    <main>
      <section className="mt-14 mb-24">
        <div className="ph-container">
          <div className="mx-auto max-w-[1000px]">
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <div className="flex gap-3 items-center mb-2">
                  <div className="flex items-center gap-2">
                    <figure className="ph-figure w-8 h-8 rounded-full">
                      <img src="/dog.webp" alt="" className="ph-image" />
                    </figure>
                    <span className="underline">Prakash Shrestha</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span>9h</span>
                </div>

                <figure className="ph-figure pt-[80%] mb-5">
                  <img src="/dog.webp" alt="" className="ph-image" />
                </figure>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  quos, libero repellat dolore tempore, nisi unde aperiam in rem
                  sapiente numquam illum hic quae aliquam iure velit quasi ipsa
                  exercitationem?
                </p>
              </div>

              <div>
                <div className="flex gap-3 items-center mb-2">
                  <div className="flex items-center gap-2">
                    <figure className="ph-figure w-8 h-8 rounded-full">
                      <img src="/dog.webp" alt="" className="ph-image" />
                    </figure>
                    <span className="underline">Prakash Shrestha</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span>9h</span>
                </div>

                <figure className="ph-figure pt-[80%] mb-5">
                  <img src="/dog.webp" alt="" className="ph-image" />
                </figure>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  quos, libero repellat dolore tempore, nisi unde aperiam in rem
                  sapiente numquam illum hic quae aliquam iure velit quasi ipsa
                  exercitationem?
                </p>
              </div>

              <div>
                <div className="flex gap-3 items-center mb-2">
                  <div className="flex items-center gap-2">
                    <figure className="ph-figure w-8 h-8 rounded-full">
                      <img src="/dog.webp" alt="" className="ph-image" />
                    </figure>
                    <span className="underline">Prakash Shrestha</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span>9h</span>
                </div>

                <figure className="ph-figure pt-[80%] mb-5">
                  <img src="/dog.webp" alt="" className="ph-image" />
                </figure>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  quos, libero repellat dolore tempore, nisi unde aperiam in rem
                  sapiente numquam illum hic quae aliquam iure velit quasi ipsa
                  exercitationem?
                </p>
              </div>
            </div>

            <Button label="Load more" classNames="mx-auto" />
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
};

export default Stories;
