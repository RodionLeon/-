import { Suspense, useCallback, useMemo, useState } from "react";
import { Await, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../components/userContext";
import { getHTTPData, patchHTTP } from "../utils/requests";

export const loader = ({ params: { id } }) => {
  const notePromise = fetch(`http://localhost:5000/notes?userId=${id}`).then(
    (r) => r.json()
  );
};
function NoteEdit() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { id } = useParams();
  const { user } = useUserContext();
  const [notes, setNotes] = useState([]);
  const promise = useLoaderData(async () => {
    const notes = await fetch(
      `http://localhost:5000/notes?userId=${user.id}`
    ).then((r) => r.json());

    setNotes(notes);
  }, [user]);
  useMemo(
    (id) => {
      getHTTPData(`http://localhost:5000/notes?id=${id}`).then((note) => {
        setBody(note.body);
        setTitle(note.title);
      });
    },
    [{ id }]
  );

  const navigate = useNavigate();

  const handleChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const handleChangeBody = useCallback((e) => {
    setBody(e.target.value);
  }, []);
  const handleSubmit = (id) => {
    const note = {
      title: title,
      body: body,
      createdAt: new Date().toLocaleDateString(),
    };
    patchHTTP(
      `http://localhost:5000/notes?id=${notes.id}&userId=${user.id}`,
      note
    );
    navigate("/notes");
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Await resolve={promise}>
        {(note) => {
          return (
            <div className="p-1 border-t border-black">
              <h1 className=" text-center text-2xl">Edit</h1>

              <div className="flex flex-col gap-1 mt-1">
                <input
                  value={title}
                  onChange={handleChangeTitle}
                  className="bg-gray-200 w-fit p-1"
                />
                <textarea
                  value={body}
                  onChange={handleChangeBody}
                  className="bg-gray-200 p-1 h-44"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="p-1.5 bg-green-200 mt-1 rounded transition-all duration-300 hover:bg-green-300 hover:scale-105"
              >
                Save changes
              </button>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}

export default NoteEdit;
