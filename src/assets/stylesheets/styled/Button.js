import styled
 from "styled-components";
export const ModeButton = styled.button`
  padding: 15px;
  border-radius: 50%;
  background: ${({ bg }) => bg};
  border: none;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`;
