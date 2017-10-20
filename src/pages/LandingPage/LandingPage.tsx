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
import { email, ethereumAddress, required } from "../../utils/validators";
import { CountDown } from "../../components/CountDown";
import DocumentTitle = require("react-document-title");
import { CopyLink } from "../../components/CopyLink";
import {
  InputWrapper, InputLabel, LandingWrapper,
  FieldError, Input, Heading, CountDownWrapper,
  SubHeading, DeliveryText, SignupForm, FormError,
  Button, Explanation, StyledLink,
  Panel, Column, Header, Copy, PanelImage,
  CalendarImage, TintedPanel, Footer, ConfirmEmail
} from "./LandingPageStyles";
const STRINGS = {
  tokenName: "Token",
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

const LandingPagePresentational: React.StatelessComponent<PropsType> = (props: PropsType) => {
  const { handleSubmit, pristine, reset, submitting } = props.formProps;
  const deadline = moment().add(7, "days");

  return (
    <DocumentTitle title={STRINGS.tokenName}>
    <div>
      <LandingWrapper>
        <Heading>Join the Frontier</Heading>
        <SubHeading>Claim your piece of the world's first tokenized asset.</SubHeading>
        <CountDownWrapper>
          <DeliveryText>Money distributed in</DeliveryText>
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
              label="Ethereum Address"
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
          <Header>How does this work?</Header>
          <Copy>Your tokens give you partial ownership over a bank account with a balance of $100.</Copy>
          <Copy>The bank account is held by a special legal entity we developed called a “SmartTrust.” 
The SmartTrust is controlled and owned by an Ethereum smart contract which distributes ownership over the trust assets by issuing tokens. </Copy>
        </Column>
        <Column>
          <PanelImage src="/images/redpiggy.png"/>
        </Column>
      </Panel>

      <TintedPanel>
        <Column>
          <CalendarImage src="/images/calendar.png"/>
        </Column>
        <Column>
          <Header>Do I Get Real Money?</Header>
          <Copy>Yes!</Copy>
          <Copy>At 12:00 PM PST on Friday, October 27, the smart contract will instruct its fiduciary to convert the $100 balance into ETH and send it to the smart contract. The smart contract will then automatically distribute the funds to the token-holders.</Copy>
        </Column>
      </TintedPanel>

      <Panel>
        <Column>
          <Header>The Tokenized Economy</Header>
          <Copy>This is the world’s first demonstration of legally-enforceable asset tokenization via the blockchain.</Copy>
          <Copy>It’s made possible by the TrustToken Protocol. You’ll be hearing more from us soon.</Copy>
        </Column>
        <Column>
          <PanelImage src="/images/globe.png"/>
        </Column>
      </Panel>
      <Footer>&copy; 2017 TrustToken Inc.</Footer>
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
    onSubmit: (props: any) => async ({ email,  ethereumAddress }) => {
      props.setSubmissionError(undefined); 
      const {referrerId} = props.match.params; // can be undefined
      try {
        const result = await props.createUser({variables:  {email,  ethereumAddress, referrerId } });
        props.setNewUser(result.data.createUser);
        props.setHasSucceeded(true);
      } catch (error) {
        if  (error.message.includes("GraphQL error: A unique constraint would be violated on User.")) {
          props.setSubmissionError("Email or ethereum address already submitted."); 
        }
      }
    },
  }),
  reduxForm({propNamespace:  "formProps", form: "signupForm" }),
)(LandingPagePresentational);

export {LandingPage};