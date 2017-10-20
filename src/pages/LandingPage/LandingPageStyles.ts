import styled from "styled-components";
import { MediaTemplate, MediaTemplateType } from "../../utils/MediaTemplate";

const media = MediaTemplate as MediaTemplateType;

export const COLORS = {
  error: "pink",
  text: "white",
};

export const Wrapper = styled.div`
  padding: 150px 20px;
  ${media.phone`padding: 50px 20px;`}
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

  ${media.phone`font-size:80px`}

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

  ${media.phone`font-size:30px; margin-top: 70px;`}
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
`;
