import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import Styled from "styled-components";
import { FaToilet } from "react-icons/fa";
export default () => {
  return (
    <Container>
      <Styles>
        <Jumbotron className="topbg">
          <span>
            {" "}
            <FaToilet size="2em" /> Map
          </span>
        </Jumbotron>
      </Styles>
    </Container>
  );
};

const Styles = Styled.div`
.FaToilet{
    text-align: center
}
.nav-header{
    padding-bottom: 40px

}
.topbg{
    background:comfybrown
    text-align:center
    padding-top:1em
    padding-bottom:1em
    background: #33ACFF
    width: 100vw

  }
  
`;
