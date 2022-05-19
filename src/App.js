import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [showText, setShowText] = useState("");
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    changeFontSize(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showText]);

  useEffect(() => {
    function handleResize() {
      if (containerRef.current.offsetHeight > textRef.current.offsetHeight + 40) {
        changeFontSize(true);
      } else {
        changeFontSize(false);
      }
    }
    window.addEventListener("resize", handleResize);
  });

  const changeFontSize = useCallback((increase) => {
    if (increase && containerRef.current.offsetHeight <= textRef.current.offsetHeight + 40) {
      return;
    }
    if (!increase && containerRef.current.offsetHeight > textRef.current.offsetHeight + 40) {
      return;
    }
    let fs = window
      .getComputedStyle(textRef.current, null)
      .getPropertyValue("font-size");
    let fontSize = parseFloat(fs);
    textRef.current.style.fontSize = `${fontSize + (increase ? 1 : -1)}px`;
    changeFontSize();
  }, []);

  const handleSubmit = (e) => {
    textRef.current.style.fontSize = `80px`;
    e.preventDefault();
    setShowText(text);
    setText("");
  };

  return (
    <div className="outer">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </form>
      <div className="App" ref={containerRef}>
        <span className="text" ref={textRef}>
          {showText}
        </span>
      </div>
    </div>
  );
}
