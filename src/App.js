import React, { useState, useEffect } from "react";
import "./App.css";
import marked from "marked";

export default function App() {
  const info = { role: "", movie: "" };
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


  const [submitText, setSubmitText] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    setSubmitText(text2);
  };

  return (
    <div className="App">
      <h1>Cover Letter auto-helper</h1>

      <div>
        <div>
          
          <form
          style={{display:"inline-flex"}}
          
            onSubmit={(e) => {
              e.preventDefault();
              setRand2(rand);
            }}
          >
            <div className="space">
            <span style={{ fontSize: "1.5em" }}>Role:</span>
            <input
              name="role"
              onChange={(e) =>
                setRand({ ...rand, [e.target.name]: e.target.value })
              }
              value={rand.role}
            />
            </div>
            <div className="space">
            <span style={{ fontSize: "1.5em" }}>Movie:</span>
            <input
              name="movie"
              onChange={(e) =>
                setRand({ ...rand, [e.target.name]: e.target.value })
              }
              value={rand.movie}
            />
            </div>

            <button className="space">go</button>
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
