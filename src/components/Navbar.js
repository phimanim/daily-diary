import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Ul = styled.ul`
  display: flex;
  justify-content: right;
  padding: 0;
  margin: 0;
`;
const Li = styled.li`
  padding: 20px;
  list-style: none;
`;
const NavbarLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  margin: 10px;
  &:hover,
  &:focus {
    color: grey;
  }
`;

const Button = styled.button`
  border: 0;
  background-color: ${({ bg }) => bg};
  font-size: inherit;
  cursor: pointer;
  color: ${({ color }) => color};

  margin: 10px;
  &:hover,
  &:focus {
    color: grey;
  }
`;
export default function Navbar() {
  const { user, handleLogout } = useAuth();
  const darkmode = useSelector((state) => state.theme.darkmode);

  if (user) {
    return (
      <div className="NavbarContainer">
        <nav>
          <Ul>
            <Li>
              <NavbarLink to="/new-daily">Write</NavbarLink>
            </Li>
            <Li>
              <NavbarLink to="/dailys">Dailys</NavbarLink>
            </Li>
            <Button
              bg={!darkmode ? "#fff" : "#344144"}
              color={!darkmode ? "#000" : "#fff"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Ul>
        </nav>
      </div>
    );
  }
  return (
    <div className="NavbarContainer">
      <nav>
        <Ul>
          <Li>
            <NavbarLink to="/login">Login</NavbarLink>
          </Li>
          <Li>
            <NavbarLink to="/signup">Signup</NavbarLink>
          </Li>
        </Ul>
      </nav>
    </div>
  );
}
