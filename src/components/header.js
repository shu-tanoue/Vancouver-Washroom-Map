import React from "react";
import { Container, Jumbotron } from "react-bootstrap";

import { FaToilet } from "react-icons/fa";
export default () => {
  return (
    <Container>
      <Jumbotron className="topbg">
        <span>
          {" "}
          <FaToilet size="1em" /> WashRoom
        </span>
      </Jumbotron>
    </Container>
  );
};
