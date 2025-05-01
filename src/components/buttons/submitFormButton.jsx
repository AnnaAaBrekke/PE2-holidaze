import { ClipLoader } from "react-spinners";
import "../../styles/button.css";

const SubmitFormButton = ({
  loading,
  children,
  loadingText = "Loading..",
  props,
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className=" bg-color-primary text-color-background text-lg px-6 py-2 rounded-lg shadow-md hover:bg-[#0d5665] m-0.5"
      {...props}
    >
      {loading ? (
        <>
          <ClipLoader />
          <span className="ml-2">{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitFormButton;
