import styled from "styled-components";
import { MediaTemplate, MediaTemplateType } from "../../utils/MediaTemplate";
import "./bob.css";

const media = MediaTemplate as MediaTemplateType;

export const Message = styled.div`
  text-align: center;
  font-size: 30px;
  color: white;
`;

export const Wrapper = styled.div`
  padding: 100px 20px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
  
  ${media.tablet`padding-top:70px; padding-bottom: 70px;`}
  ${media.phone`padding-top:70px; padding-bottom: 70px;`}
`;

export const SuccessWrapper = styled.div`
  font-size: 20px;
`;

export const Heading = styled.div`
  font-size: 80px;
  text-align: center;

  ${media.tablet`font-size:50px`}
  ${media.phone`font-size:40px`}
`;

export const CoinWrapper = styled.div`
  padding-top: 100px;
  ${media.tablet`padding-top:80px`}
`;

export const CoinImage = styled.img`
  width: 150px;
  height: 150px;
  animation-name: hvr-bob-float, hvr-bob;
  animation-duration: .3s, 1.5s;
  animation-delay: 0s, .3s;
  animation-timing-function: ease-out, ease-in-out;
  animation-iteration-count: 1, infinite;
  animation-fill-mode: forwards;
  animation-direction: normal, alternate;

  ${media.tablet`width:120px; height: 120px;`}
  ${media.phone`width:80px; height: 80px;`}
`;

export const Address = styled.span`
  font-family: Inconsolata;
  font-size: 20px;
  margin-top: 4px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0 auto;
`;

export const Copy = styled.div`
  margin-top: 50px;
  padding: 0 20px;
`;

export const StyledNumber = styled.span`
  font-size: 30px;
  font-family: Inconsolata;
`;

export const ReferralWrapper = styled.div`
  padding: 20px;
  margin-top: 100px;

  ${media.phone`margin-top:60px;`}
`;

export const Referral = styled.div`
  border: 2px dashed #fff;
  border-radius: 10px;
  padding: 20px;
  ${media.tablet`font-size:18px`}
  ${media.phone`font-size:14px;`}
`;

export const ShareIcon = styled.a`
  padding: 20px;
  font-size: 30px;
  width: 30px;
  height: 30px;
  text-align: center;
  text-decoration: none;
  background: #3B5998;
  color: white;
  border-radius: 50px;

  &:hover {
    opacity: 0.7;
  }
`;