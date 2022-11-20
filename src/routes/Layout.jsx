import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../components/userContext";

export default function Layout() {
  const user = useUserContext();
  const handleLogout = () => {
    user.setUser({ email: "" });
  };
  const arrUser = [user];

  return (
    <>
      <div className="p-2">
        <header className=" flex gap-1 justify-between mb-5">
          <div>Hello, {arrUser[0].user.email}</div>
          <NavLink className="mt-2" to="/about" end={true}>
            About
          </NavLink>
          <NavLink to="/notes" end={true}>
            Notes
          </NavLink>

          <button onClick={handleLogout} className="text-red-500">
            Log out
          </button>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
