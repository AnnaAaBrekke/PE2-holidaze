import { FaStar } from "react-icons/fa";

const StarRating = ({ rating = 0, size = "h-4 w-4" }) => {
  const roundedRating = Math.round(rating);
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`${size} ${i < roundedRating ? "text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default StarRating;
