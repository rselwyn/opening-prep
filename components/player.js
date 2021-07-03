import Link from "next/link";

import { ButtonGroup, Button } from "@material-ui/core";

const Player = ({ back, change, forward, running }) => (
  <>
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button onClick={back}>Back</Button>
      <Button onClick={change}>{running ? "Pause" : "Start" }</Button>
      <Button onClick={forward}>Forward</Button>
    </ButtonGroup>

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-flow: column;
      }
      label > span {
        font-weight: 600;
      }
      input {
        padding: 8px;
        margin: 0.3rem 0 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        justify-content: space-between;
      }
      .submit > a {
        text-decoration: none;
      }
      .submit > button {
        padding: 0.5rem 1rem;
        cursor: pointer;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .submit > button:hover {
        border-color: #888;
      }
      .error {
        color: brown;
        margin: 1rem 0 0;
      }
    `}</style>
  </>
);

export default Player;
