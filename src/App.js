import React, { useState, useEffect } from "react";
import "./App.css";
import marked from "marked";

export default function App() {
  const info = { role: "Amazing", movie: "Stranger things" };
  const [rand, setRand] = useState(info);
  const [rand2, setRand2] = useState();

  const text = `text random 1 ${
    rand2 ? rand2.role : "{role}"
  } and the movie is ${rand2 ? rand2.movie : "{movie}"}`;
  const [text2, setText2] = useState(text);
  useEffect(() => {
    setRand(rand);
    setText2(text);
  }, [rand, rand2, text]);

  console.log("infffo", info);

  const [submitText, setSubmitText] = useState();
  console.log("INFO->", info.company);

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitText(text2);
  };
  console.log("RRRAAA", rand2);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      {/* <h1>rand: {rand2}</h1> */}

      <div style={{ display: "inline-flex" }}>
        <div>
          <span style={{ fontSize: "1.5em" }}>Role:</span>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setRand2(rand);
              console.log("rand2**", rand);
            }}
          >
            <input
              name="role"
              onChange={(e) =>
                setRand({ ...rand, [e.target.name]: e.target.value })
              }
              value={rand.role}
            />
            <input
              name="movie"
              onChange={(e) =>
                setRand({ ...rand, [e.target.name]: e.target.value })
              }
              value={rand.movie}
            />
            {console.log("RRRAAAIND", rand2)}
            <button>go</button>
          </form>
        </div>
      </div>
      <div style={{ display: "inline-flex" }}>
        <div style={{ margin: "10px" }}>
          <h2>MarkDown Input</h2>
          {rand ? (
            <form onSubmit={submitHandler}>
              <textarea
                value={text2}
                name="role"
                onChange={(e) => {
                  console.log("take 2", e.target.value);
                  setText2(e.target.value);
                }}
                style={{
                  background: "grey",
                  padding: "10px",
                  width: "400px",
                  height: "50vh",
                  marginLeft: "auto",
                  marginRight: "auto"
                }}
              />
              <div></div>
              <button>Submit</button>
            </form>
          ) : (
            "...Loading"
          )}
        </div>
        <div style={{ margin: "10px" }}>
          <h2>Preview</h2>
          <Previewer submitText={submitText} />
        </div>
      </div>
    </div>
  );
}

const Previewer = ({ submitText }) => {
  return (
    <div
      style={{
        background: "lightgrey",
        padding: "10px",
        width: "400px",
        height: "50vh",
        backgroundColor: "#DCDCDC",
        marginLeft: "auto",
        marginRight: "auto"
      }}
      dangerouslySetInnerHTML={{
        __html: marked(submitText ? submitText : "")
      }}
    ></div>
  );
};
