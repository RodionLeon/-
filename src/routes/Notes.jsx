import icon1 from "../pen.png";
import icon2 from "../del.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useUserContext } from "../components/userContext";

function Notes() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [notes, setNotes] = useState([]);

  const promise = useCallback(async () => {
    const notes = await fetch(
      `http://localhost:5000/notes?userId=${user.id}`
    ).then((r) => r.json());

    setNotes(notes);
  }, [user]);

  useEffect(() => {
    promise();
  }, [promise]);
  const { notes: id } = useParams;
  const handleDelete = useCallback(
    (id) => {
      fetch(`http://localhost:5000/notes/${id}`, { method: "DELETE" })
        .then((r) => r.json())
        .then(console.log);
      navigate("/notes");
    },
    [{ notes: id }, navigate]
  );

  console.log(notes);

  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl">Notes</div>
      <Link
        to="/create"
        className="text-2xl bg-stone-200 pt-2 pb-2 pl-10 pr-10 mt-5"
      >
        Add new note
      </Link>

      {notes.map((note) => (
        <div
          key={note.id}
          className="flex flex-row bg-stone-200 mt-5 pl-3 pr-3 items-center"
        >
          <div className="w-[300px] h-[60px] px-4 bg-stone-200 pt-3 text-2xl rounded-sm">
            {note.title}
          </div>
          <div className="flex flex-row gap-2">
            <button onClick={() => handleDelete(note.id)}>
              <img className="w-4" alt="icon" src={icon2} />
            </button>
            <Link to="/edit">
              <img className="w-4" alt="icon" src={icon1} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Notes;
