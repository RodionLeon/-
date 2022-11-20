import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  const handleRedirect = useCallback(
    (e) => {
      e.target.id === "notes" ? navigate("/notes") : navigate("/about");
    },
    [navigate]
  );
  return (
    <div className="flex items-center flex-col gap-1 p-2 border-t ">
      <h1 className="text-xl">Unexpected error ocured.</h1>
      <div className="flex flex-col gap-2 ">
        <button
          onClick={handleRedirect}
          id="notes"
          className="p-1 transition-all duration-300 hover:scale-105"
        >
          Notes
        </button>
        <button
          onClick={handleRedirect}
          id="about"
          className="p-1 transition-all duration-300 hover:scale-105"
        >
          About
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
