import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [showText, setShowText] = useState(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const fontSizeRef = useRef(100);
  const paddingRef = useRef(40);

  useEffect(() => {
    handleResize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showText])

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleResize = () => {
    if (textRef.current.offsetHeight <= 0) { return; }
    changeFontSizeImprove();
  }

  const changeFontSize = useCallback((isIncrease) => {
    console.log('old way')
    if (isIncrease && containerRef.current.offsetHeight <= textRef.current.offsetHeight + paddingRef.current) {
      changeFontSize(false);
      return;
    }
    if (!isIncrease && containerRef.current.offsetHeight > textRef.current.offsetHeight + paddingRef.current) {
      textRef.current.style.opacity = 1;
      return;
    }
    let style = window
      .getComputedStyle(textRef.current, null)
      .getPropertyValue("font-size");
    let fontSize = parseFloat(style);
    textRef.current.style.fontSize = `${fontSize + (isIncrease ? 1 : -1)}px`;
    changeFontSize(isIncrease);
  }, []);

  const changeFontSizeImprove = useCallback(() => {
    // ----- increase size
    if (containerRef.current.offsetHeight <= textRef.current.offsetHeight + paddingRef.current) {
      while (containerRef.current.offsetHeight <= textRef.current.offsetHeight + paddingRef.current) {
        let style = window
          .getComputedStyle(textRef.current, null)
          .getPropertyValue("font-size");
        let fontSize = parseFloat(style);
        textRef.current.style.fontSize = `${fontSize - 1}px`
      }

      textRef.current.style.opacity = 1;
      return;
    }
    // ----- decrease size
    if (containerRef.current.offsetHeight > textRef.current.offsetHeight + paddingRef.current) {
      while (containerRef.current.offsetHeight > textRef.current.offsetHeight + paddingRef.current) {
        let style = window
          .getComputedStyle(textRef.current, null)
          .getPropertyValue("font-size");
        let fontSize = parseFloat(style);
        textRef.current.style.fontSize = `${fontSize + 1}px`
      }

      while (containerRef.current.offsetHeight <= textRef.current.offsetHeight + paddingRef.current) {
        let style = window
          .getComputedStyle(textRef.current, null)
          .getPropertyValue("font-size");
        let fontSize = parseFloat(style);
        textRef.current.style.fontSize = `${fontSize - 1}px`
      }

      textRef.current.style.opacity = 1;
      return;
    }
  }, [])

  const handleSubmit = (e) => {
    textRef.current.style.fontSize = `${fontSizeRef.current}px`;
    textRef.current.style.opacity = 0;
    e.preventDefault();
    setShowText({ text });
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
          {showText && showText.text}
        </span>
      </div>
    </div>
  );
}
