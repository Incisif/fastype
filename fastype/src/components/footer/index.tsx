import styled from "styled-components";
import { Link } from "react-router-dom";
import { faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const FooterContent = styled.div`
  width: 100vw;
  height: 12.5rem;
  display: flex;
  align-items: center;
  background-color: #4f5458;
`;
const ContentWrapper = styled.div`
  width: 1228px;
  margin: 0 auto;
  display: flex;
  
`;
const LinksWrapper = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: max-content;
  margin-right: 10rem;
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
const Title = styled.h2`
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 10px;
`;
const Footer: React.FC = () => {
  return (
    <FooterContent>
      <ContentWrapper>
        <LinksWrapper>
          <Title>À porpos</Title>
          <FooterLinks to="/about">À propos de Fastype</FooterLinks>
          <FooterLinks to="/contact">Me contacter</FooterLinks>
          <ExternalLink href="https://portfolio.desem.dev/">
            Portfolio
          </ExternalLink>
        </LinksWrapper>
        <IconWrapper>
          <Title>Suivez-moi en ligne</Title>
          <ExternalLink href="https://github.com/Incisif/fastype">
            <Icon icon={faGithub} />
            Github
          </ExternalLink>
          <ExternalLink href="https://www.linkedin.com/in/emmanuel-desmortreux-1223a5257/">
            <Icon icon={faLinkedin} />
            Linkedin
          </ExternalLink>
          <ExternalLink href="https://twitter.com/_Emdodj">
            <Icon icon={faTwitter} />
            Twitter
          </ExternalLink>
        </IconWrapper>
      </ContentWrapper>
    </FooterContent>
  );
};
export default Footer;
