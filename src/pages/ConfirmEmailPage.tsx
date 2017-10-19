import * as React from "react";
import styled from "styled-components";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { CopyLink } from "../components/CopyLink";

export const SuccessWrapper = styled.div`
  margin-top: 150px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

const SuccessMessage = (props) => (
  <SuccessWrapper>
    <p>Congratulations! You've received 1 token!</p>
    <p>A transfer has been initiated with Ethereum address <pre>{props.user.ethereumAddress}</pre></p>
    <p>Share the link below with your friends to earn extra tokens.</p>
    {<CopyLink link={`${window.location.host}/referrer/${props.user.id}`} />}
    <p>You will receive 1 additional token for each friend who signs up and confirms their email address through your referral link.</p>
  </SuccessWrapper>
);

class ConfirmEmailPage extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      hasError: false,
      hasConfirmed: false,
      userId: null,
    };
  }

  public componentWillMount() {
    this.props.confirmEmail({ variables: { confirmationToken: this.props.match.params.confirmationToken } })
      .then((result) => {
        console.log("result", result);
        if (result.data.confirmEmail && result.data.confirmEmail.id) {
          const { id, email, ethereumAddress } = result.data.confirmEmail;
          this.setState({
            isLoading: false,
            hasConfirmed: true,
            user: { id, email, ethereumAddress },
          });
        } else {
          this.setState({
            isLoading: false,
            hasError: true,
          });
        }
      });
  }

  public render() {
    return (
      <div className="container">
        {this.state.hasError &&
          "Your email confirmation code is invalid. Back to sign up page."
        }
        {this.state.isLoading && !this.state.hasError &&
          "Confirming your email..."
        }
        {this.state.hasConfirmed &&
          <SuccessMessage user={this.state.user} />
        }
      </div>
    );
  }
}

const confirmEmail = gql`
mutation confirmEmail($confirmationToken: String!) {
  confirmEmail(confirmationToken: $confirmationToken){
    id
    email
    ethereumAddress
  }
}
`;

export const ConfirmEmailPageWithMutations = compose(
  graphql(confirmEmail, { name: "confirmEmail" }),
  withRouter
)(ConfirmEmailPage);