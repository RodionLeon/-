import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../components/userContext";
function CreateNote() {
  const navigate = useNavigate();

  const user = useUserContext();

  const arrUser = [user];
  const [title, setTitle] = useState("");
  const handleSetTitle = useCallback((e) => setTitle(e.target.value), []);

  const [body, setBody] = useState("");
  const handleSetBody = useCallback((e) => setBody(e.target.value), []);

  const handleAddNote = useCallback(() => {
    const note = {
      title: title,
      body: body,
      userId: arrUser[0].user.id,
      createdAt: new Date().toLocaleString(),
    };

    fetch(`http://localhost:5000/notes`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-type": "application/json",
      },
    }).then(() => {
      navigate("/notes");
    });
  });
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row gap-56 items-start">
        <div className="text-4xl ml-[12%]">Create new note</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-2 ">
          <input
            type="text"
            className="w-[900px] h-[50px] px-4 mt-5 bg-stone-200 text-2xl rounded-sm"
            placeholder="Name"
            value={title}
            onChange={handleSetTitle}
          />
          <input
            type="text"
            className="w-[900px] h-[200px] px-4 mt-5 bg-stone-200 text-2xl align-top rounded-sm"
            placeholder="Note text..."
            value={body}
            onChange={handleSetBody}
          />
        </div>
        <Link
          className="text-2xl bg-stone-200 pt-2 pb-2 pl-10 pr-10 mt-5"
          to="/note"
          onClick={handleAddNote}
        >
          Create
        </Link>
        <Link
          to="/notes"
          className="text-2xl bg-stone-200 pt-2 pb-2 pl-10 pr-10 mt-5"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default CreateNote;
