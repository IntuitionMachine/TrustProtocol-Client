import styled from "styled-components";
import { MediaTemplate, MediaTemplateType } from "../../utils/MediaTemplate";

const media = MediaTemplate as MediaTemplateType;

export const COLORS = {
  error: "pink",
  text: "white",
};

// Landing
export const LandingWrapper = styled.div`
  padding: 150px 20px;
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
  font-size: 40px;
  text-align: center;
  margin-top: 100px;

  ${media.phone`font-size:30px; margin-top: 40px;`}
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
  background: none;
  outline: none;
  width: 310px;
  height: 55px;
  border: 1px solid ${COLORS.text};
  color: ${COLORS.text};
  font-size: 15px;
  text-transform: uppercase;
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
  margin-top: 100px;
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
  background-image: linear-gradient(to bottom,rgba(108,206,236,0.15),rgba(255,255,255,0));
  background-color: white !important;
`;

export const Column = styled.div`
  padding: 50px 30px;
  max-width: 500px;

`;

export const Header = styled.div`
  font-size: 40px;
  color: #28304f;
  ${media.desktop`
    font-size: 50px;
  `}

  ${media.phone`
    font-size: 40px;
  `}
`;

export const Copy = styled.div`
  color: rgb(78, 78, 78);
  font-size: 18px;
  margin-top: 25px;

  ${media.desktop`
    font-size: 20px;
  `}
`;

export const ImageWrapper = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 175px;
  overflow: hidden;
`;

export const InnerImage = styled.img`
  margin-top: -4px;
  margin-left: -145px;
  width: 647px;
}
`;

export const CenteredCopy = Copy.extend`
  text-align: center;
`;

export const PanelImage = styled.img`
  width: 310px;
  padding: 0 40px;
  ${media.tablet`
    width: 250px;
    padding: 0;
  `}
`;

export const DiagramImage = PanelImage.extend`
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