import { useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";

export function Home() {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [AI, setAI] = useState("");
  const [result, setResult] = useState("");
  const [AIButtonName, setAIButtonName] = useState("Ask to AI");

  const HandleButton = async (e, data) => {
    e.preventDefault();
    try {
      setAIButtonName("Getting AI Help... Please Wait");
      // Make an AJAX request to the custom endpoint
      const response = await fetch(
        `https://66b0149175c492528b35.appwrite.global/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AIData: data,
          }),
        }
      );
      const result = await response.json();

      if (result) {
        setAIButtonName("Speak With AI");
        console.log(result.data.choices[0].message.content);
        setResult(result.data.choices[0].message.content);

        // setResult(result);
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Show the submit form to logged in users. */}
      {user.current ? (
        <section>
          <h2>Submit Idea</h2>
          <form>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <button
              type="button"
              onClick={() =>
                ideas.add({ userId: user.current.$id, title, description })
              }
            >
              Submit
            </button>
          </form>
          <div>
            <input
              type="text"
              placeholder="Write Something"
              value={AI}
              onChange={(e) => setAI(e.target.value)}
            />
            <button
              disabled={
                AIButtonName === "Getting AI Help... Please Wait" ? true : false
              }
              onClick={(e) => HandleButton(e, AI)}
            >
              {AIButtonName}
            </button>
            <div>{result}</div>
          </div>
        </section>
      ) : (
        <section>
          <p>Please login to submit an idea.</p>
        </section>
      )}
      <section>
        <h2>Latest Ideas</h2>
        <ul>
          {ideas.current.map((idea) => (
            <li key={idea.$id}>
              <strong>{idea.title}</strong>
              <p>{idea.description}</p>
              {/* Show the remove button to idea owner. */}
              {user.current && user.current.$id === idea.userId && (
                <button type="button" onClick={() => ideas.remove(idea.$id)}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
