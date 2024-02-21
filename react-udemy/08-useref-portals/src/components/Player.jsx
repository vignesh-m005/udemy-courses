import { useRef, useState } from "react";

export default function Player() {
  const [name, setName] = useState(null);
  const nameRef = useRef();

  function handleClick() {
    setName(nameRef.current.value);
    nameRef.current.value = "";
  }
  return (
    <section id="player">
      <h2>Welcome {name ?? "Unkown entity"}</h2>
      <p>
        <input ref={nameRef} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
