import styled from "styled-components";
import { MediaTemplate, MediaTemplateType } from "../../utils/MediaTemplate";

const media = MediaTemplate as MediaTemplateType;

export const COLORS = {
  error: "pink",
  text: "white",
};

// Landing
export const LandingWrapper = styled.div`
  padding: 130px 20px;
  ${media.phone`
    padding: 50px 20px;
    padding-top: 30px;
  `}
`;

export const FormError = styled.div`
  color: ${COLORS.error};
  font-size: 18px;
`;

export const FieldError = styled.div`
  margin-top: 4px;
  color: ${COLORS.error};
  font-size: 14px;
`;

export const Heading = styled.div`
  font-size: 100px;
  text-align: center;

  ${media.phone`font-size:60px`}

`;

export const ConfirmEmail = styled.div`
  text-align: center;
  margin-top: 80px;
  font-size: 20px;
`;

export const Explanation = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

export const StyledLink = styled.a`
  font-size: 14px;
  color: ${COLORS.text};
  text-decoration: underline;
  cursor: pointer;
`;

export const SubHeading = styled.div`
  font-size: 60px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
  text-align: center;
  max-width: 790px;
  margin: 0 auto;

  ${media.phone`font-size:30px;`}
`;

export const DeliveryText = styled.div`
  display: inline-block;
  font-size: 40px;
  margin-bottom: 20px;
  ${media.phone`font-size:30px;`}
`;

export const CountDownWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;

  ${media.phone`margin-top: 40px;`}
`;

export const Button = styled.button`
  padding: 15px 35px;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
  border-radius: 4px;
  background-color: #54b0fa;
  color: ${COLORS.text};
  outline: none;
  height: 55px;
  border: none;
  box-shadow: 3px 5.2px 16px 0 #323674;
  cursor: pointer;
  margin-top: 40px;

  transition: all 0.3s ease 0s;
  &:hover {
    background-color: rgba(255,255,255,0.2);
  }
`;

export const YellowButton = Button.extend`
  background-color: #f0ab39;
  &:hover {
    background-color: #f29803;
  }
`;

export const TopClearButton = Button.extend`
  float: right;
  position: absolute;
  top: 0px;
  right: 40px;
  width: 216px;
  height: 50px;
  color: white;
  font-size: 12px;
  background-color: transparent;
  &:hover {
    background-color: rgba(255,255,255,0.2);
  }

  ${media.tablet`
    left: 50%;
    margin-left: -108px;
  `}

`;

export const InputLabel: any = styled.label`
  color: ${(props: any) => props.invalid ? COLORS.error : COLORS.text};
`;

export const InputWrapper = styled.div`
  margin-top: 40px;
`;

export const Input = styled.input`
  min-width: 300px;
  max-width: 500px;
  height: 30px;
  background: none;
  color: ${COLORS.text};
  font-size: 15px;
  font-weight: lighter;
  padding: 5px;
  outline: none;

  border: none;
  border-bottom: 1px solid;
  border-color: ${(props: any) => props.invalid ? COLORS.error : COLORS.text};

  &::placeholder {
    color: ${COLORS.text};
    font-size: 18px;
    font-weight: lighter;
  }

  &:focus {
    outline: none;
  }
`;

export const CenteredImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 96px;
  height: 96px;
`;

export const SignupForm = styled.form`
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${media.phone`
    margin-top: 30px;
  `}
`;

// Panel
export const Panel = styled.div`
  padding: 100px 40px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #D8D8D8;

  ${media.desktop`
    flex-direction: column;
    text-align: center;
    padding: 40px 40px;
  `}
`;

export const BorderlessPanel = Panel.extend`
  padding-top: 0px;
  border: none;
`;

export const VerticalPanel = Panel.extend`
  flex-direction: column;
`;

export const TintedPanel = Panel.extend`
  background: linear-gradient(to right bottom,#2f1847,#361f51,#5d3b7b,#a966ae);
`;

export const Column = styled.div`
  padding: 50px 30px;
  max-width: 500px;

`;

export const Header = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: #1b2c3f;
  ${media.desktop`
    font-size: 50px;
  `}

  ${media.phone`
    font-size: 40px;
  `}
`;

export const LightHeader = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: white;
  ${media.desktop`
    font-size: 50px;
  `}

  ${media.phone`
    font-size: 40px;
  `}
`;

export const Copy = styled.div`
  margin-top: 25px;
  color: #6b7c93;
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 600;
  line-height: 1.49em;
  margin: 15px 0;
  text-align: left;

  ${media.desktop`
    font-size: 20px;
  `}
`;

export const LightCopy = styled.div`
  margin-top: 25px;
  color: #d1c1e1;
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 600;
  line-height: 1.49em;
  margin: 15px 0;
  text-align: left;

  ${media.desktop`
    font-size: 20px;
  `}

  a {
    color: white;
  }
`;

export const LargeCopy = Copy.extend`
  font-size: 30px;
`;

export const EthereumAddress = styled.span`
  font-family: Inconsolata;
  ${media.phone`font-size: 14px;`}
`;

export const ImageWrapper = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 175px;
  overflow: hidden;
  ${media.phone`
    width: 300px;
    height: 300px;
    border-radius: 150px;
  `}
`;

export const InnerImage = styled.img`
  margin-top: -4px;
  margin-left: -145px;
  width: 647px;

  ${media.phone`
    margin-top: -1px;
    margin-left: -118px;
    width: 548px;
  `}
`;

export const CenteredCopy = Copy.extend`
  text-align: center;
`;

export const PanelImage = styled.img`
  width: 310px;
  padding: 0 40px;
  animation: floating 1.8s linear alternate infinite;
  @keyframes floating {
    from {
      transform: translateY(0px);
    }
    to {
      transform: translateY(25px);
    }
  }
  ${media.tablet`
    width: 250px;
    padding: 0;
  `}
`;

export const DiagramImage = PanelImage.extend`
  animation: none !important;
  width: 700px;
  padding: 0px;
  ${media.desktop`width: 600px;`}
  ${media.tablet`width: 400px;`}
  ${media.phone`width: 300px;`}
`;

export const CalendarImage = PanelImage.extend`
  width: 250px;
`;

export const LogoImage = PanelImage.extend`
  width: 270px;
`;

export const Footer = styled.div`
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
