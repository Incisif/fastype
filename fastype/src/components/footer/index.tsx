import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterContent = styled.div`
  width: 100VW;
  height: 150px;
  display: flex;
  align-items: center;
  background-color: #4f5458;
`;
const ContentWrapper = styled.div`
  width: 1228px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;
const LinksWrapper = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: max-content;
`;
const FooterLinks = styled(Link)`
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  cursor: pointer;
`;
const ExternalLink = styled.a`
  font-family: "Roboto", sans-serif;
  color: #ffffff;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Icon = styled(FontAwesomeIcon)`
  color: #ffffff;
  font-size: 1rem;
  margin-right: 20px;
  cursor: pointer;
`;
const Footer: React.FC = () => {
  return (
    <FooterContent>
      <ContentWrapper>
        <LinksWrapper>
          <FooterLinks to="/about">About</FooterLinks>
          <FooterLinks to="/contact">Contact</FooterLinks>
          <ExternalLink href="https://portfolio.desem.dev/">
            Portfolio
          </ExternalLink>
        </LinksWrapper>
        <IconWrapper>
          <ExternalLink href="https://github.com/Incisif/fastype">
            <Icon icon={["fab", "github"]} />
            Github
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/emmanuel-desmortreux-1223a5257/">
            <Icon icon={["fab", "linkedin"]} />
            Linkedin
          </ExternalLink>
          <ExternalLink href="https://twitter.com/_Emdodj">
            <Icon icon={["fab", "x-twitter"]} />
            Twitter
          </ExternalLink>
        </IconWrapper>
      </ContentWrapper>
    </FooterContent>
  );
};
export default Footer;
