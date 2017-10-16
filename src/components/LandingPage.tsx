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
import { email, ethereumAddress, required } from "../utils/validators";
import { CountDown } from "./CountDown";
import DocumentTitle = require("react-document-title");
import { CopyLink } from "./CopyLink";

const COLORS = {
  error: "pink",
  text: "white",
};

const STRINGS = {
  tokenName: "SpecialCoin",
};

const CREATE_USER_MUTATION = gql`
mutation createUser($email: String!, $ethereumAddress: String!, $referrerId: ID) {
  createUser(email: $email, ethereumAddress: $ethereumAddress, referrerId: $referrerId) {
    ethereumAddress
  }
}
`;

const FormError = styled.div`
  color: ${COLORS.error};
  font-size: 20px;
`;

const FieldError = styled.div`
  margin-top: 4px;
  color: ${COLORS.error};
  font-size: 14px;
`;

const Heading = styled.div`
  font-size: 100px;
  text-align: center;
  margin-top: 300px;
`;

const SubHeading = styled.div`
  font-size: 40px;
  text-align: center;
  margin-top: 100px;
`;

const DeliveryText = styled.div`
  display: inline-block;
  font-size: 40px;
`;

const CountDownWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: none;
  outline: none;
  width: 300px;
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

const InputLabel: any = styled.label`
  color: ${(props: any) => props.invalid ? COLORS.error : COLORS.text};
`;

const InputWrapper = styled.div`
  margin-top: 40px;
`;

const Input = styled.input`
  width: 500px;
  height: 30px;
  background: none;
  color: ${COLORS.text};
  font-size: 18px;
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
`;

const CenteredImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 96px;
  height: 96px;
`;

const SignupForm = styled.form`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SuccessWrapper = styled.div`
  margin-top: 150px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const SuccessMessage = (props) => (
  <SuccessWrapper>
    <p>Confirm your email address to recieve your tokens when delievery happens.</p>
    {/*`${window.location.host}/referrer/${props.newUser.id}`*/}

    <p>Share the link below with your friends to earn extra tokens.</p>
    <CopyLink link={`${window.location.host}/referrer/lksjdfaldjf892374jkds`} />
  </SuccessWrapper>
);

interface PropsType {
  formProps: any;
  newUser: any;
  match: { params: { referrerId?: string } };
  submissionError: string | undefined;
  hasSucceeded: string | undefined;
  createUser: (variables: any) => any;
}

const renderField = (props) => {
  const {
    input,
    name,
    label,
    type,
    placeholder,
    className,
    meta: { touched, error, warning },
  } = props;
  console.log("props", props);
  return (
    <InputWrapper>
      <InputLabel htmlFor={name} invalid={!!(touched && error)}>{label}</InputLabel>
      <div>
        <Input {...input} placeholder={placeholder} type={type} invalid={!!(touched && error)} />
        {touched && (error && <FieldError>{error}</FieldError>)}
      </div>
    </InputWrapper>
  );
};

const LandingPagePresentational: React.StatelessComponent<PropsType> = (props: PropsType) => {
  const { handleSubmit, pristine, reset, submitting } = props.formProps;
  console.log("formProps", props.formProps);
  const deadline = moment().add(7, "days");

  return (
    <DocumentTitle title={STRINGS.tokenName}>
      <div className="container">
        <div className="row">
          <Heading>Join the Frontier</Heading>
          <SubHeading>Claim your piece of the world's first tokenized asset.</SubHeading>
          <CountDownWrapper>
            <DeliveryText>Tokens delivered in</DeliveryText>
            <CountDown deadline={deadline} />
          </CountDownWrapper>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {props.hasSucceeded &&
              <SuccessMessage newUser={props.newUser} />
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

                <Button type="submit">
                  {submitting ? "Submitting..." : `Claim Your ${STRINGS.tokenName}`}
                </Button>
              </SignupForm>
            }
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
};

const LandingPage = compose(
  withRouter,
  graphql(CREATE_USER_MUTATION, { name: "createUser" }),
  withState("submissionError", "setSubmissionError", undefined),
  withState("hasSucceeded", "setHasSucceeded", false),
  withState("newUser", "setNewUser", undefined),
  withHandlers({
    onSubmit: (props: any) => async ({ email, ethereumAddress }) => {
      props.setSubmissionError(undefined);
      const { referrerId } = props.match.params; // can be undefined
      try {
        const result = await props.createUser({ variables: { email, ethereumAddress, referrerId } });
        props.setNewUser(result.data.createUser);
        props.setHasSucceeded(true);
      } catch (error) {
        if (error.message.includes("GraphQL error: A unique constraint would be violated on User.")) {
          props.setSubmissionError("Email or ethereum address already submitted.");
        }
      }
    },
  }),
  reduxForm({ propNamespace: "formProps", form: "signupForm" }),
)(LandingPagePresentational);

export { LandingPage };