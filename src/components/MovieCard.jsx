import { useNavigate } from "react-router-dom";
import { useUser } from "@sbcontext/UserContext";
import { useBookmarks } from "@/contexts/BookmarkContext";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { IMAGE_BASE_URL } from "@/constants/urls";

export default function MovieCard({ id, title, poster_path, vote_average }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const numericRating = Number(vote_average);
  const displayRating =
    Number.isFinite(numericRating) && numericRating > 0
      ? numericRating.toFixed(1)
      : "N/A";

  const handleBookmark = (e) => {
    e.stopPropagation();

    if (!user) {
      toast.info("로그인이 필요합니다!");
      return;
    }

    toggleBookmark({
      id,
      title,
      poster_path,
      vote_average: numericRating,
    });
  };

  return (
    <div
      className="relative cursor-pointer group"
      onClick={() => navigate(`/details/${id}`)}
    >
      {/* 이미지 */}
      <img
        src={`${IMAGE_BASE_URL}${poster_path}`}
        alt={title}
        className="rounded-lg shadow-md w-full group-hover:opacity-90 transition"
      />

      {/* 평점 */}
      <span className="absolute bottom-2 left-2 bg-black/70 text-white text-sm px-2 py-1 rounded">
        ⭐ {displayRating}
      </span>

      {/* 북마크 버튼 */}
      <Button
        onClick={handleBookmark}
        aria-label="bookmark"
        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-sm font-bold transition
          ${
            isBookmarked(id)
              ? "bg-yellow-400 text-black"
              : "bg-white/80 text-gray-700"
          }
        `}
      >
        {isBookmarked(id) ? "★" : "☆"}
      </Button>
    </div>
  );
}
