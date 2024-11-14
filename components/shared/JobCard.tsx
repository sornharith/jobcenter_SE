"use client";

import Link from "next/link";
import { jobType } from "@/types/jobTypes";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { useState } from "react";

interface JobsCardProps {
  job: jobType;
}

const JobCard = ({ job }: JobsCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when clicking bookmark
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Link href={`/job/${job.id}`}>
      <div className="border p-3 rounded-md flex flex-col hover:bg-purple-600 transition duration-700 hover:text-white relative">
        <div className="flex justify-between">
          <div>
            <Image
              src={job.img ? job.img : "/fallbackimage.png"}
              height={40}
              width={40}
              alt={`${job.author} logo`}
            />
            <h2 className="text-sm">{job.author}</h2>
          </div>
          <h2>{job.salary}k/year</h2>
        </div>

        <div className="mt-3 text-xl">
          <h3>{job.name}</h3>
          <p>{job.location}</p>
          <span className="bg-purple-600 text-xs px-3 rounded-md text-white">
            {job.employmentType}
          </span>
        </div>

        <div 
          className="absolute bottom-3 left-3 cursor-pointer"
          onClick={handleBookmarkClick}
        >
          <Bookmark
            size={24}
            fill={isBookmarked ? "#FFD700" : "none"}
            color={isBookmarked ? "#FFD700" : "currentColor"}
          />
        </div>
      </div>
    </Link>
  );
};

export default JobCard;