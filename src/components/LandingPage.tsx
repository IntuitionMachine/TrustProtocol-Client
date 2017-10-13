import * as React from "react";
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

const CREATE_USER_MUTATION = gql`
mutation createUser($email: String!, $address: String!, $refererId: ID) {
  createUser(email: $email, address: $address, refererId: $refererId) {
    id
    email
    address
  }
}
`;

const Error = styled.div`
  color: red;
`;

const SuccessMessage = (props) => (
  <div>
    <h3> Please confirm your email </h3>
    <p>We've sent you a confirmation email. Please click on the provided link </p>
    <h3> Share this link with your friends! </h3>
    {`${window.location.host}/?referer=${props.newUser.id}`}
  </div>
);

interface PropsType {
  formProps: any;
  newUser: any;
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
        <input {...input} className="form-control" placeholder={placeholder} type={type} />
        {touched && (error && <Error>{error}</Error>)}
      </div>
    </div>
  );

const LandingPagePresentational: React.StatelessComponent<PropsType> = (props: PropsType) => {
  console.log("props", props);
  const { handleSubmit, pristine, reset, submitting } = props.formProps;
  return (
    <div className="container">
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
  graphql(CREATE_USER_MUTATION, { name: "createUser" }),
  withState("submissionError", "setSubmissionError", undefined),
  withState("hasSucceeded", "setHasSucceeded", false),
  withState("newUser", "setNewUser", undefined),
  withHandlers({
    onSubmit: (props: any) => async ({ email, ethereumAddress }) => {
      console.log("submitting");
      props.setSubmissionError(undefined);
      try {
        const result = await props.createUser({ variables: { email, address: ethereumAddress } });
        props.setNewUser(result.data.createUser);
        props.setHasSucceeded(true);
        console.log("success", result);
      } catch (error) {
        console.error(error);
        if (error.message.includes("GraphQL error: A unique constraint would be violated on User.")) {
          props.setSubmissionError("Email or ethereum address already exists.");
        }
      }
    },
  }),
  reduxForm({ propNamespace: "formProps", form: "signupForm" }),
  withRouter,
)(LandingPagePresentational);

export { LandingPage };