import * as React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withState, ComponentEnhancer, compose } from "recompose";

const Wrapper = styled.div`
  font-family: monospace;
  font-weight: lighter;
	padding: 10px;
	border-radius: 3px;
	background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin-left: 8px;
`;

const LinkWrapper = styled.span`
  padding: 8px;
	border-radius: 3px;
	background: rgba(0, 0, 0, 0.1);
	display: inline-block;
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
    text-decoration: ${(props: any) => props.hasCopiedLink ? "none" : "underline"};
    cursor: ${(props: any) => props.hasCopiedLink ? "auto" : "pointer"};
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
      <LinkWrapper>{props.link}</LinkWrapper>
      <CopyToClipboard text={props.link}>
        <CopyButton onClick={() => props.setHasCopiedLink(true)} hasCopiedLink={props.hasCopiedLink}>
          Copy
        </CopyButton>
      </CopyToClipboard>

    </Wrapper>
  );
};

const CopyLink = compose<PropsIn, PropsOut>(
  withState("hasCopiedLink", "setHasCopiedLink", false)
)(CopyLinkPresentational);

export { CopyLink };