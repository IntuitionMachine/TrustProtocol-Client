import * as React from "react";
import * as moment from "moment";
import styled from "styled-components";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { compose, withHandlers, withState } from "recompose";
import { withRouter } from "react-router";
import * as _ from "lodash";
import * as queryString from "query-string";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { email, ethereumAddress, required, emailWithoutPlus } from "../../utils/validators";
import { CountDown } from "../../components/CountDown";
import DocumentTitle = require("react-document-title");
import { CopyLink } from "../../components/CopyLink";
import {
  InputWrapper, InputLabel, LandingWrapper, WhiteLink,
  FieldError, Input, Heading, CountDownWrapper,
  SubHeading, DeliveryText, SignupForm, FormError,
  Button, Explanation, StyledLink,
  Panel, Column, Header, Copy, PanelImage,
  CalendarImage, TintedPanel, Footer, ConfirmEmail, LogoImage, VerticalPanel, YellowButton, TopClearButton, ImageWrapper, InnerImage, BorderlessPanel, DiagramImage, LargeCopy, EthereumAddress
} from "./LandingPageStyles";

const STRINGS = {
  tokenName: "Song Token",
};

const CREATE_USER_MUTATION = gql`
mutation createUser($email: String!, $ethereumAddress: String!, $referrerId: ID) {
  createUser(email: $email, ethereumAddress: $ethereumAddress, referrerId: $referrerId) {
    id
  }
}
`;

interface PropsType {
  formProps: any;
  newUser: any;
  match: { params: { referrerId?: string } };
  submissionError: string | undefined;
  hasSucceeded: string | undefined;
  createUser: (variables: any) => any;
}

const renderField = ({
  input,
  name,
  label,
  type,
  placeholder,
  className,
  meta: { touched, error, warning },
  }) => (
    <InputWrapper>
      <InputLabel htmlFor={name} invalid={!!(touched && error)}>{label}</InputLabel>
      <div>
        <Input {...input} placeholder={placeholder} type={type} invalid={!!(touched && error)} />
        {touched && (error && <FieldError>{error}</FieldError>)}
      </div>
    </InputWrapper>
  );

const RocketChatButton = (props) => {
  const Button = props.component;
  return (
    <form method="get" action="https://trusttoken.rocket.chat" target="_blank">
      <Button type="submit">Talk to us on RocketChat</Button>
    </form>
  );
};

const LandingPagePresentational: React.StatelessComponent<PropsType> = (props: PropsType) => {
  const { handleSubmit, pristine, reset, submitting } = props.formProps;
  const deadline =  moment("Nov 11 23:59:00 -0800", "MMM DD hh:mm:ss Z"); 

  return (
    <DocumentTitle title={STRINGS.tokenName}>
      <div>
        <LandingWrapper>
          {/* <RocketChatButton component={TopClearButton} /> */}
          {/* <Heading>Join the Frontier</Heading> */}
          <SubHeading>Help us create the world's first tokenized, collaborative song.</SubHeading>
          <CountDownWrapper>
            <DeliveryText>Experiment ends in</DeliveryText>
            <CountDown deadline={deadline} />
          </CountDownWrapper>
          {props.hasSucceeded &&
            <ConfirmEmail>Thanks for signing up! Confirm your email to receive your tokens.</ConfirmEmail>
          }
          {!props.hasSucceeded &&
            <SignupForm onSubmit={handleSubmit}>
              {props.submissionError && <FormError>{props.submissionError}</FormError>} <Field
                name="email"
                label="Email"
                component={renderField}
                type="text"
                validate={[required, email]}
              />
              <Field
                name="ethereumAddress"
                label="Public Ethereum Wallet Address"
                component={renderField}
                type="text"
                validate={[required, ethereumAddress]}
              />
              <Explanation>
                Don't have an Ethereum address yet? Set one up <StyledLink target="_blank" href="https://www.myetherwallet.com/">here</StyledLink>.
            </Explanation>

              <Button type="submit">
                {submitting ? "Submitting..." : `Get Your Free ${STRINGS.tokenName}`}
              </Button>
            </SignupForm>
          }
        </LandingWrapper>

        <Panel>
          <Column>
            <Header>What's this all about?</Header>
            <Copy>Enter your public Ethereum address, receive a song token!</Copy>
            <Copy>If you hold a token, you get access to a private collaboration network where you’ll contribute to writing the lyrics of a song alongside singer/songwriter Taryn Southern.</Copy>
            <Copy>In exchange, you’ll receive a percentage of the revenue of the song - created by you, the community - from sales and streams on iTunes, Spotify, and more.</Copy>
          </Column> <Column>
            <PanelImage src="/images/music.png" />
          </Column>
        </Panel>

        <TintedPanel>
          <Column>
            <Header isLight={true}>Who is Taryn?</Header>
            <Copy isLight={true}><a href="https://www.tarynsouthern.com/" target="_blank">Taryn Southern</a> is a digital storyteller and songwriter interested in how blockchain-based ownership can enable greater transparency and efficiency across collaborations in the music and media industry.</Copy>
          </Column>
          <Column>
            <ImageWrapper>
              <InnerImage src="/images/taryn2.jpg" />
            </ImageWrapper>
          </Column>
        </TintedPanel>

        <Panel>
          <Column>
            <PanelImage src="/images/redpiggy.png" />
          </Column>
          <Column>
            <Header>How is the song worth?</Header>
            <Copy>The pool of token holders will receive 50% of the songwriting revenue, and Taryn will receive the other 50%.</Copy>
            <Copy>Unless the song is a huge hit, revenue is likely to be small. 🙂</Copy>
            <Copy>This purpose of this experiment is to highlight how blockchain-based ownership can help solve issues of accounting and transparency for the artist community, as well as give people a first-hand look at how creative assets like music are produced, distributed, and paid out to collaborators.</Copy>
          </Column>
        </Panel>

        <TintedPanel>
          <Column>
            <Header isLight={true}>When can I expect to get paid?</Header>
            <Copy isLight={true}>Because payments for music are dispersed differently from distributors, the simplest way to provide accounting for this project is at the beginning of the calendar year, with a two year cap.</Copy>
          </Column>
          <Column>
            <CalendarImage src="/images/calendar.png" />
          </Column>
        </TintedPanel>

        <Panel>
          <Column>
            <LogoImage src="/images/tt-logo.png" />
          </Column>
          <Column>
            <Header>So how does this all work?</Header>
            <Copy>The song is held by a special legal entity called a “SmartTrust.” The SmartTrust is controlled and owned by an Ethereum smart contract which distributes ownership over the trust assets by issuing tokens. The trust, representing the ownership of the song, will distribute its share of song royalties to Ether and distribute it to the token-holder collaborators.</Copy>
            <Copy>This experiment is done in collaboration with TrustToken, which builds technology that allows distributed, legally-enforceable ownership of real-world assets via the blockchain. We're distributing tokens for free in this experiment to gather feedback from the community and test the tokenization protocol.</Copy>
            <Copy>The beneficial owner of the Crypto Song Trust is the smart contract at the Ethereum address <EthereumAddress>0x4BB301e545A3e948b20EA9A0F02D3948af6Fe6db</EthereumAddress>.</Copy>
          </Column>
        </Panel>

        <BorderlessPanel>
            <DiagramImage src="/images/new-diagram.png" style={{maxWidth: "1400px", width: "100%"}}/>
        </BorderlessPanel>

        <VerticalPanel>
          <LargeCopy>Let’s build the tokenized creative economy...and make beautiful music together!</LargeCopy>
          {/* <RocketChatButton component={YellowButton} /> */}
        </VerticalPanel>

        <Footer>
          <div className="container">
          <div className="row">
          <div className="col-sm-6">
            &copy; 2017 TrustToken Inc.
          </div>
          <div className="col-sm-6">
             <WhiteLink href="mailto:hello@trusttoken.com" target="_top"> hello@trusttoken.com </WhiteLink>
          </div>
          </div>
          </div>

        </Footer>
      </div>
    </DocumentTitle>
  );
};

const LandingPage = compose(
  withRouter,
  graphql(CREATE_USER_MUTATION, { name:  "createUser" }),
  withState("submissionError", "setSubmissionError", undefined),
  withState("hasSucceeded", "setHasSucceeded", false),
  withState("newUser", "setNewUser", undefined),
  withHandlers({
    onSubmit: (props: any) => async ({ email, ethereumAddress }) => {
      props.setSubmissionError(undefined);
      const {referrerId} = props.match.params; // can be undefined
      try {
        const result = await props.createUser({variables: {email, ethereumAddress, referrerId } });
        props.setNewUser(result.data.createUser);
        props.setHasSucceeded(true);
      } catch (error) {
        props.setSubmissionError("Email or ethereum address already submitted.");
      }
    },
  }),
  reduxForm({propNamespace: "formProps", form: "signupForm" }),
)(LandingPagePresentational);

export {LandingPage};
