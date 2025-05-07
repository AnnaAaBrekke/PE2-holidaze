/**
 * SubmitFormButton - A styled submit button for forms that shows a loading spinner when submitting.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.loading - Whether the button is in a loading state.
 * @param {string} [props.loadingText="Loading.."] - Text displayed next to the spinner.
 * @param {React.ReactNode} props.children - Button content when not loading.
 * @param {Object} [props.props] - Additional props passed to the button element (e.g., aria attributes).
 * @returns {JSX.Element} A styled submit button with loading state support.
 */

import { ClipLoader } from "react-spinners";

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
      className="bg-color-primary text-color-background text-lg px-6 py-2 rounded-lg shadow-md hover:bg-[#0d5665] m-0.5"
      {...props}
    >
      {loading ? (
        <>
          <ClipLoader color="#ffffff" size={20} className="pt-3" />
          <span className="ml-2">{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SubmitFormButton;
