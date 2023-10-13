import styled from "styled-components";

const FooterContent = styled.div`
width: 100vw;
height: 100px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: #4F5458;`
const Footer: React.FC = () =>  {
  return (
    <FooterContent></FooterContent>
  )
}
export default Footer