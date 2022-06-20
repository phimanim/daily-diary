import React from "react";
import styled from "styled-components";
export default function Footer() {
  
  const style = {
    display:"flex",
    flexDirection:"column",
    alignItems: "center",
    postion: "fixed",
    bottom: "0",

  };

  const Li = styled.li`
    list-style: none;
    margin: 20px;
  `;
  let github = "https://github.com/phimanim/";
  let linkedin = "https://www.linkedin.com/in/imane-aliker/";

  return (
    <footer
      className="Footer"
      style={style}
    >
      
        <ul style={{ display: "flex", flexDirection: "row", padding:"0" }}>
          <Li>
            <a href={github} target="_blank" rel="noopener noreferrer">
              {" "}
              Github
            </a>
          </Li>
          <Li>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              Linkedin
            </a>
          </Li>
          <Li>
            <a href="mailto: aliker.imane@gmail.com">Email</a>
          </Li>
        </ul>
    </footer>
  );
}
