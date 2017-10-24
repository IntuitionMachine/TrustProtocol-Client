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
  Wrapper, ShareIcon, Referral, Message, StyledNumber
} from "./ConfirmEmailPageStyles";
import { generateShareIcon } from "react-share";
import { StyledFacebookButton, StyledTwitterButton, SocialMediaButtons } from "../../components/SocialMediaButtons";

const TOKEN_COUNT_QUERY = gql`
query {
  tokenCount {
    count
  }
}
`;

const truncate = (address: string) => address.substr(0, 8) + "...";

const ReferralBox = (props) => {
  const FacebookIcon = generateShareIcon("facebook");
  const TwitterIcon = generateShareIcon("twitter");
  const title = "Get a piece of the world’s first tokenized bank account #blockchain";
  const referralLink = `${window.location.protocol}//${window.location.host}/referrer/${props.userId}`;

  return (
    <ReferralWrapper>
      <Referral>
        <p>Share the link below with your friends to earn extra tokens.</p>
        <p>You will be awarded 1 additional token for each friend who signs up through your link!</p>
        <CopyLink link={referralLink} />
        <SocialMediaButtons>
          <StyledFacebookButton
            url={referralLink}
            quote={title}
          >
            <FacebookIcon size={60} round={true} />
          </StyledFacebookButton>

          <StyledTwitterButton
            url={referralLink}
            title={title}
          >
            <TwitterIcon size={60} round={true} />
          </StyledTwitterButton>
        </SocialMediaButtons>
      </Referral>
    </ReferralWrapper >
  );
};

const SuccessMessage = (props) => (
  <SuccessWrapper>
    <Heading>Congratulations!</Heading>
    <CoinWrapper>
      <CoinImage src="/images/coin.png" />
    </CoinWrapper>
    <p>You've received <StyledNumber>1</StyledNumber> token!</p>
    <Copy>A transfer has been initiated with Ethereum address <Address>{truncate(props.user.ethereumAddress)}</Address></Copy>
    <Copy>Total tokens issued so far: <StyledNumber>{props.tokenCount}</StyledNumber></Copy>

    {/* <ReferralBox userId={props.user.id} /> */}
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
      })
      .catch((error) => {
        this.setState({ hasError: true });
      });
  }

  public render() {
    console.log("props", this.props);
    return (
      <Wrapper>
        {this.state.hasError &&
          <Message>Error! Invalid Code</Message>
          // <SuccessMessage
          //   user={{
          //     id: "cj8yzvd1j8nt80126ic7ersqa",
          //     email: "shadi@gmail.com",
          //     ethereumAddress: "0x2837423749328423874324234324233333434343",
          //   }}
          //   tokenCount={340}
          // />
        }
        {this.state.isLoading && !this.state.hasError &&
          <Message>Confirming your email...</Message>
        }
        {this.state.hasConfirmed &&
          <SuccessMessage user={this.state.user} tokenCount={this.props.data.tokenCount.count} />
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
  graphql(TOKEN_COUNT_QUERY),
  withRouter
)(ConfirmEmailPage);