import React, { useState, useEffect } from "react";
import "./App.css";
import marked from "marked";
import { renderToString } from "react-dom/server";
import jsPDF from "jspdf";


const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

// const print = () => {
//   const string = renderToString(<Previewer />);
//   const pdf = new jsPDF("p", "mm", "a4");
//   pdf.fromHTML(string);
//   pdf.save("div.pdf");

// };

const App = () => {
  const info = { role: "", movie: "" };
  const [rand, setRand] = useState(info);
  const [rand2, setRand2] = useState();


  const text = `


Dear ${rand2 ? rand2.movie : "{company}"} team, 

I'm excited to be applying for the ${rand2 ? rand2.role : "{role}"} position at ${rand2 ? rand2.movie : "{company}"}. As someone who is highly focused and attentive to detail, I thrive on building quality systems that surpass end users' expectations. I'm thrilled at the opportunity to show off my technical expertise and leadership skills as part of ${rand2 ? rand2.movie : "{company}"}'s expert team.

During my previous role at Crane & Jenkins, I was charged with developing innovative solutions across a variety of software platforms. I was instrumental in developing mobile-ready expense tracking software for our fast-growing portfolio of real estate clients. In 2016, I led the development of a proprietary document management system and was responsible for the successful migration of all client content from our legacy system to the new platform.

I am also attentive to the need for continued process improvements. When we faced repeated deadline delays due to Quality Assurance challenges, I proposed and carried out the implementation of an automated bug tracking system to identify potential issues earlier in the development cycle. This resulted in an average of 43% fewer defects reported during late-stage QA reviews and a 32% reduction in days between project kickoff and production launch.

Thank you for your time and consideration. I'm looking forward to learning more details about the ${rand2 ? rand2.role : "{role}"} position at ${rand2 ? rand2.movie : "{company}"}. I'm excited about the opportunity to leverage my unique range of skills, and I'm eager to demonstrate my commitment to developing world-class software solutions for ${rand2 ? rand2.movie : "{company}"}.

Sincerely,


Eunice Baiden

`
  const [text2, setText2] = useState(text);
  useEffect(() => {
    setRand(rand);
    setText2(text);
  }, [rand, rand2, text]);


  const [submitText, setSubmitText] = useState();
  const date = new Date().toLocaleString('en-us',{month:'long', year:'numeric', day:'numeric'})

  const submitHandler = (e) => {
    e.preventDefault();

    setSubmitText(date +text2);
  };

  // const print = () => {
  //   const string = renderToString(submitText);
  //   const pdf = new jsPDF("p", "mm", "a4");
  //   pdf.fromHTML(string);
  //   pdf.save("div.pdf");
  
  // };

  
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
          <span style={{ fontSize: "1.5em" }}>Company:</span>
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
)}

export default App;

const Previewer = ({ submitText }) => {
  const print = () => {
    const string = renderToString(
    <div style={{padding: "10%", background:"red"}} dangerouslySetInnerHTML={{ __html: marked(submitText ? submitText : "")}}></div>);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });
    pdf.fromHTML(string, 20, 20, {
      pagesplit: true,
      width: pdf.internal.pageSize.getWidth=165
  });
    pdf.save("div.pdf");
    console.log("helloa", pdf.internal.pageSize.getWidth)
  
  };
  return (
    <>
    <div
      style={{
        background: "lightgrey",
        padding: "10px",
        width: "400px",
        minHeight: "50vh",
        backgroundColor: "#DCDCDC",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign:"left"
      }}
      dangerouslySetInnerHTML={{
        __html: marked(submitText ? submitText : "")
      }}
    ></div>
    <button onClick={print}>Save PDF</button>
    </>
  );
};

