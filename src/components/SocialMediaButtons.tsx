import styled from "styled-components";
import { ShareButtons } from "react-share";
const { FacebookShareButton, TwitterShareButton } = ShareButtons;

const SocialMediaButtons = styled.div`
  margin-top: 20px;
`;

const StyledFacebookButton = styled(FacebookShareButton) `
  width: 60px;
  height: 60px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
`;

const StyledTwitterButton = styled(TwitterShareButton) `
  width: 60px;
  height: 60px;
  outline: none;
  cursor: pointer;
  display: inline-block;
`;

export {
  SocialMediaButtons,
  StyledFacebookButton,
  StyledTwitterButton
};