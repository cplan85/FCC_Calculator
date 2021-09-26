import React, { useEffect, useState } from "react";

function Pad({ clip, volume, current, setCurrent, setVolume }) {
  const [active, setActive] = useState(false);

  /*
  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    audioTag.currentTime = 0;
    audioTag.play();
    audioTag.volume = volume;
    current = clip.id;
    setCurrent(current);
    setActive(true);
    setTimeout(() => setActive(false), 200);
  };
  */

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      // playSound();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={active ? "activate drum-pad" : "drum-pad normal"}
      //   onClick={playSound}
      size="lg"
      variant="secondary"
      id={clip.id}
    >
      <audio className="clip" id={clip.id} src={clip.url} />
      {clip.numberValue}
    </div>
  );
}

export default Pad;
