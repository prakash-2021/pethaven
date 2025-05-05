import parse from "html-react-parser";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { getShortRelativeTime } from "../../utils/getShortRelativeTime";
import style from "./index.module.scss";
import { useGetStory } from "./queries";

export const StoryDetail = () => {
  const { id } = useParams();

  const { data } = useGetStory(id || "");

  console.log(data);

  return (
    <section className="mt-14 mb-20">
      <div className="ph-container">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8 col-start-3">
            <h1 className="ph-heading--three mb-2">{data?.title}</h1>
            <p className="ph-body--medium mb-5">{data?.shortDescription}</p>

            <div className="flex items-center gap-3 text-sm text-gray-600 mb-5">
              <div className="flex items-center gap-2">
                <figure className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={data?.user.image}
                    alt="user"
                    className={"w-full h-full object-cover"}
                  />
                </figure>
                <span className="font-medium underline text-gray-800 text-xl">
                  {data?.user.firstName} {data?.user.lastName}
                </span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              <span className="text-xl">
                {getShortRelativeTime(data?.createdAt || "")}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
              <span className="text-xl">
                {data?.content &&
                  `${Math.ceil(
                    data.content.trim().split(/\s+/).length / 200
                  )} min read`}
              </span>
            </div>

            <div>
              <figure className="ph-figure pt-[65%]">
                <img src={data?.thumbnail} alt="" className="ph-image" />
              </figure>
            </div>

            <div className={style.storyContent}>
              {parse(data?.content || "")}

              <Link
                to="/story"
                className="inline-flex items-center gap-1 text-xl font-semibold text-[#f16849] hover:text-[#d95433] transition-all duration-200 mt-8 group"
              >
                Read more stories
                <IoIosArrowForward className="w-5 h-5 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
