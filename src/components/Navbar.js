import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import styled from "styled-components";

const Ul = styled.ul`
  display: flex;
  justify-content: center;
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
export default function Navbar() {
  const { user, handleLogout } = useAuth();
  console.log("user", user);

  if (user) {
    return (
      <div className="NavbarContainer">
        <nav>
          <Ul>
            <Li>
              <NavbarLink to="/new-daily">Write</NavbarLink>
            </Li>
            <Li>
              <NavbarLink to="/profile">Profile</NavbarLink>
            </Li>
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
