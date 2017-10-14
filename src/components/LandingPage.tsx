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

const CREATE_USER_MUTATION = gql`
mutation createUser($email: String!, $ethereumAddress: String!, $referrerId: ID) {
  createUser(email: $email, ethereumAddress: $ethereumAddress, referrerId: $referrerId) {
    id
    email
    ethereumAddress
  }
}
`;

const Error = styled.div`
  color: red;
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

const SuccessMessage = (props) => (
  <div>
    <h3> Please confirm your email </h3>
    <p>We've sent you a confirmation email. Please click on the provided link </p>
    <h3> Share this link with your friends! </h3>
    {`${window.location.host}/referrer/${props.newUser.id}`}
  </div>
);

const Input = styled.input`
  width: 200px;
`;

const CenteredImg = styled.img`
  display: block;
  margin: 0 auto;
  width: 96px;
  height: 96px;
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
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <Input {...input} placeholder={placeholder} type={type} />
        {touched && (error && <Error>{error}</Error>)}
      </div>
    </div>
  );

const LandingPagePresentational: React.StatelessComponent<PropsType> = (props: PropsType) => {
  console.log("props", props);
  const { handleSubmit, pristine, reset, submitting } = props.formProps;
  const deadline = moment().add(7, "days");

  return (
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
            <form onSubmit={handleSubmit}>
              {props.submissionError && <Error>{props.submissionError}</Error>}
              <Field
                name="email"
                label="Email"
                component={renderField}
                type="text"
                placeholder="email@email.com"
                validate={[required, email]}
              />
              <Field
                name="ethereumAddress"
                label="Ethereum Address"
                component={renderField}
                type="text"
                placeholder="0x9acf9283"
                validate={[required, ethereumAddress]}
              />
              <button type="submit" disabled={pristine || submitting}>
                {submitting ? "Submitting..." : "Claim Your FreeToken"}
              </button>
            </form>
          }
        </div>
      </div>
    </div>
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
          props.setSubmissionError("Email or ethereum address already exists.");
        }
      }
    },
  }),
  reduxForm({ propNamespace: "formProps", form: "signupForm" }),
)(LandingPagePresentational);

export { LandingPage };