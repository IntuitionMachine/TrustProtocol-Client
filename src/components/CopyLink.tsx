import * as React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withState, ComponentEnhancer, compose } from "recompose";
import { MediaTemplate, MediaTemplateType } from "../utils/MediaTemplate";

const media = MediaTemplate as MediaTemplateType;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TintedWrapper = styled.div`
  font-family: Inconsolata;
  font-weight: lighter;
	padding: 10px;
	border-radius: 3px;
	background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkWrapper = styled.span`
  padding: 8px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
   
  /* Track */
  &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3); 
      -webkit-border-radius: 10px;
      border-radius: 10px;
  }
   
  /* Handle */
  &::-webkit-scrollbar-thumb {
      -webkit-border-radius: 10px;
      border-radius: 10px;
      background: rgba(158, 158, 158, 0.8); 
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
  }

  &::-webkit-scrollbar-thumb:window-inactive {
    background: #ffffff; 
  }

  ${media.tablet`width: 200px; overflow-x: scroll;`}
  ${media.phone`width: 150px;`}
`;

const CopyButton: any = styled.button`
  outline: none;
  background: transparent;
  outline: none;
  border: none;
  color: white;
  font-size: 15px;
  font-family: Roboto;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface PropsOut {
  link: string;
}

interface PropsIn extends PropsOut {
  hasCopiedLink: any;
  setHasCopiedLink: any;
}

const CopyLinkPresentational: React.StatelessComponent<PropsIn> = (props: PropsIn) => {
  return (
    <Wrapper>
      <TintedWrapper>
      <LinkWrapper>{props.link}</LinkWrapper>
      <CopyToClipboard text={props.link}>
        <CopyButton>
          Copy
        </CopyButton>
      </CopyToClipboard>
      </TintedWrapper>
    </Wrapper>
  );
};

const CopyLink = compose<PropsIn, PropsOut>(
  withState("hasCopiedLink", "setHasCopiedLink", false)
)(CopyLinkPresentational);

export { CopyLink };