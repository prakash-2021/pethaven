import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { getShortRelativeTime } from "../../utils/getShortRelativeTime";
import style from "./index.module.scss";

type User = {
  firstName: string;
  lastName: string;
};

export type Story = {
  id: string;
  title: string;
  thumbnail: string;
  shortDescription: string;
  createdAt: string;
  user: User;
  status: string;
};

type StoryCardProps = {
  story: Story;
};

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <Link
      to={`/story/${story.id}`}
      className={twMerge(
        style.card,
        "cursor-pointer h-full bg-[#f168492f] shadow-xs rounded-xl overflow-hidden transition-transform transform p-4 flex flex-col gap-3"
      )}
    >
      {/* User Info */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <figure className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={story.thumbnail}
              alt="user"
              className="w-full h-full object-cover"
            />
          </figure>
          <span className="font-medium underline text-gray-800">
            {story.user.firstName} {story.user.lastName}
          </span>
        </div>
        <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-400"></span>
        <span>{getShortRelativeTime(story.createdAt)}</span>
        <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-400"></span>
        <span>
          {story.status === "APPROVED"
            ? "Published"
            : story.status === "Rejected"
            ? "Rejected"
            : "On Review"}
        </span>
      </div>

      {/* Thumbnail */}
      <figure className="w-full aspect-[4/3] relative rounded-sm overflow-hidden shadow-sm">
        <img
          src={story.thumbnail}
          alt="story"
          className={twMerge(
            style.image,
            "absolute top-0 left-0 w-full h-full object-cover"
          )}
        />
      </figure>

      {/* Story Content */}
      <div className="flex flex-col gap-1">
        <h3
          className={twMerge(
            style.title,
            "text-lg sm:text-xl font-semibold text-gray-800"
          )}
        >
          {story.title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
          {story.shortDescription}
        </p>
      </div>
    </Link>
  );
};

export default StoryCard;
