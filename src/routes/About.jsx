import { useUserContext } from "../components/userContext";
import { Link } from "react-router-dom";
function About() {
  const { user } = useUserContext();

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl  mt-5 ">About me</div>
      <div className="mt-5 ">Email: {user.email}</div>
      <div>Date sign up: {user.createdAt}</div>

      <Link
        to="/notes"
        className="text-2xl bg-stone-200 pt-2 pb-2 pl-10 pr-10 mt-12"
      >
        Go to notes
      </Link>
    </div>
  );
}

export default About;
