import styled from "styled-components";
import { Logo } from "../logo/Logo";

const FooterContainer = ({ className, links = [], contacts = [], copy }) => {
  return (
    <div className={className}>
      <footer>
        <Logo width="250px" height="100px" />
        <div className="links">
          {links.map((link, index) => (
            <a key={index} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="contacts">
          {contacts.map((c, i) => (
            <p key={i}>{c}</p>
          ))}
        </div>

        <div className="info-footer">
          <p>{copy}</p>
        </div>
      </footer>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  z-index: 1;
  width: 100%;
  height: 300px;
  position: relative;

  & footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & .links {
    display: flex;
    gap: 120px;
    margin-bottom: 20px;
    & a {
      text-decoration: none;
      color: #000;
      cursor: pointer;
    }
  }

  & .contacts {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    & p {
      margin: 0;
    }
  }

  & .info-footer {
    left: calc(50% - 500px);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;
    gap: 100px;
    width: 1000px;
    height: 40px;
    margin: 0 auto;
  }
`;
