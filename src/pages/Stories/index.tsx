import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdOutlineMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";
import {
  Button,
  CTA,
  ScrollToTop,
  SelectInput,
  StoryModal,
  TextInput,
} from "../../components";
import StoryCard from "../../components/StoryCard";
import { useLocalStorageState } from "../../utils/use-localstorage";
import { useGetAllStory } from "../StoryDetail/queries";

const Stories = () => {
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchDebounced] = useDebounceValue(search, 400);
  const [category, setCategory] = useState("Inspiration");
  const { data: storyData } = useGetAllStory(
    1,
    limit,
    searchDebounced,
    category
  );

  const [showModal, setShowModal] = useState(false);

  const token = useLocalStorageState("token");

  return (
    <main>
      <section className="mt-14 mb-24">
        <div className="ph-container">
          <h2 className="ph-heading--three mb-6 text-center">
            🐾 Share Your Pet Story
          </h2>

          <p className="ph-body--small max-w-[800px] mb-10 text-center mx-auto">
            Celebrate the bond you share with your furry friend. Whether it’s an
            adoption journey, a rescue tale, or a lost-and-found miracle—your
            story could inspire and help others in the petHaven community.
          </p>

          <div className="mx-auto mb-12 flex items-center justify-between gap-5">
            <div className="flex items-center gap-8">
              <div className="min-w-[30rem]">
                <TextInput
                  placeholder="Search by name, breed or species"
                  type="text"
                  endIcon={<BiSearch size={18} />}
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <div className="min-w-[12rem]">
                <SelectInput
                  options={[
                    { label: "Inspirational", value: "Inspiration" },
                    { label: "Lost Pet", value: "Lost" },
                  ]}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
              </div>
            </div>
            {token ? (
              <Button
                label={
                  <div className="flex items-center gap-3">
                    <MdOutlineMenuBook size={20} />
                    <span>Share your story</span>
                  </div>
                }
                onClick={() => setShowModal(true)}
                variant="secondary"
                size="small"
              />
            ) : (
              <Link to={"/login"}>
                <Button
                  label={
                    <div className="flex items-center gap-3">
                      <MdOutlineMenuBook size={20} />
                      <span>Login Share your story</span>
                    </div>
                  }
                  variant="secondary"
                  size="small"
                />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-3 gap-8 mb-10">
            {storyData?.stories.length ? (
              storyData?.stories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))
            ) : (
              <p className="text-[#F16849]">Did not found any story!</p>
            )}
          </div>

          {(storyData?.meta.totalStories || 0) > limit && (
            <Button
              label="Explore more stories"
              size="small"
              classNames="mx-auto mb-16"
              onClick={() => setLimit(limit + 10)}
            />
          )}
        </div>
      </section>

      <CTA />

      <ScrollToTop />

      <StoryModal
        handleClose={() => setShowModal(false)}
        isModalOpen={showModal}
      />
    </main>
  );
};

export default Stories;
