import * as React from "react";
import styled from "styled-components";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { CopyLink } from "../../components/CopyLink";
import { MediaTemplate, MediaTemplateType } from "../../utils/MediaTemplate";
import {
  ReferralWrapper, SuccessWrapper, Heading,
  CoinWrapper, CoinImage, Copy, Address,
  ShareIcon, Wrapper
} from "./ConfirmEmailPageStyles";

const ReferralBox = (props) => (
  <ReferralWrapper>
    <p>Share the link below with your friends to earn extra tokens.</p>
    <p>For each friend who signs through your link, you will be awarded 1 additional token!</p>
    <CopyLink link={`${window.location.host}/referrer/${props.userId}`} />
  </ReferralWrapper>
);

const SuccessMessage = (props) => (
  <SuccessWrapper>
    <Heading>Congratulations!</Heading>
    <CoinWrapper>
      <CoinImage src="/images/coin.png" />
    </CoinWrapper>
    <p>You've received 1 token!</p>
    <Copy>A transfer has been initiated with Ethereum address</Copy>
    <Address>{props.user.ethereumAddress}.</Address>
    <ReferralBox userId={props.user.id} />
    {/* <ShareIcon href="#" className="fa fa-facebook" />
    <ShareIcon href="#" className="fa fa-twitter" /> */}
  </SuccessWrapper>
);

class ConfirmEmailPage extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      hasError: false,
      hasConfirmed: false,
      user: {},
    };
  }

  public componentWillMount() {
    this.props.confirmEmail({ variables: { confirmationToken: this.props.match.params.confirmationToken } })
      .then((result) => {
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
      <Wrapper>
        {this.state.hasError &&
          <SuccessMessage
            user={{
              id: "cj8yzvd1j8nt80126ic7ersqa",
              email: "shadi@gmail.com",
              ethereumAddress: "0x2837423749328423874324234324233333434343",
            }}
          />

          // "Error, invalid code!"
        }
        {this.state.isLoading && !this.state.hasError &&
          "Confirming your email..."
        }
        {this.state.hasConfirmed &&
          <SuccessMessage user={this.state.user} />
        }
      </Wrapper>
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