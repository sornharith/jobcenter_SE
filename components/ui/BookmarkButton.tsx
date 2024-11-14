// components/BookmarkButton.tsx
"use client";

import { Bookmark } from "lucide-react";
import { useState } from "react";

const BookmarkButton = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <button
      onClick={() => setIsBookmarked(!isBookmarked)}
      className="hover:scale-110 transition-transform"
    >
      <Bookmark
        size={24}
        fill={isBookmarked ? "#FFD700" : "none"}
        color={isBookmarked ? "#FFD700" : "currentColor"}
      />
    </button>
  );
};

export default BookmarkButton;