const SkeletonLoader = ({ count = 6, layout = "grid", type = "card" }) => {
  const containerClass =
    layout === "grid"
      ? "grid sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10"
      : "flex flex-col items-center gap-6";

  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="w-72 bg-gray-200 animate-pulse rounded-lg flex flex-col gap-4 p-4">
            <div className="h-60 bg-gray-300 rounded-md"></div> {/* Image */}
            <div className="h-5 bg-gray-300 rounded"></div> {/* Title */}
            <div className="h-2.5 bg-gray-300 rounded w-1/3"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-300 rounded-full w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded-full w-1/3"></div>
              <div className="h-4 bg-gray-300 rounded-full w-1/3"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded-full w-24"></div>
            {/* Price */}
          </div>
        );

      case "login":
      case "register":
        return (
          <div className="w-full max-w-sm p-6 bg-gray-200 animate-pulse rounded-lg flex flex-col gap-4">
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            {/* Email */}
            <div className="h-10 bg-gray-300 rounded w-full"></div>
            {/* Password */}
            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
            {/* Button */}
          </div>
        );

      case "dashboard":
        return (
          <div className="w-full flex flex-col gap-10">
            <div className="h-10 w-1/3 bg-gray-300 rounded mx-auto animate-pulse"></div>
            {/* Dashboard Title */}
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200 p-6 rounded-lg animate-pulse flex flex-col gap-4"
                >
                  <div className="h-32 bg-gray-300 rounded"></div>
                  {/* Venue Image */}
                  <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
                  {/* Venue Title */}
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  {/* Venue Info */}
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                    {/* Edit */}
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                    {/* Delete */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-96 bg-gray-300 animate-pulse rounded-lg"></div>
        );
    }
  };

  return (
    <div className={containerClass}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={`skeleton-key-${index}`}>{renderSkeleton()}</div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
