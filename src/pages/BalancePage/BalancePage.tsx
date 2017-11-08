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
} from "./BalancePageStyles";
import { generateShareIcon } from "react-share";
import { StyledFacebookButton, StyledTwitterButton, SocialMediaButtons } from "../../components/SocialMediaButtons";

const TOKEN_COUNT_QUERY = gql`
query {
  tokenCount {
    count
  }
}
`;

const USER_TOKEN_BALANCE_QUERY = gql`
query getTokenBalance($ethereumAddress: String!) {
  userTokenBalance(ethereumAddress: $ethereumAddress) {
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
    <p>You have <StyledNumber>{props.userTokenBalance}</StyledNumber> token!</p>
    {<Copy>Your tokens are being transferred to Ethereum address <Address>{truncate(props.ethereumAddress)}</Address></Copy>}
    <Copy>Check your email inbox for an email from noreply@trusttoken.com.</Copy>
    <Copy>You will receive an invite to the collaborative chat group to create the song after the token distribution closes on November 11.</Copy>
    <Copy> In the meantime, share this with your friends so they can join the project, too!</Copy>
    <Copy>Total song tokens issued so far: <StyledNumber>{props.tokenCount}</StyledNumber></Copy>

    {/* <ReferralBox userId={props.user.id} /> */}
  </SuccessWrapper>
);

class BalancePagePresentational extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      hasError: false,
      user: {},
    };
  }

  public render() {
    console.log("props", this.props);
    return (
      <Wrapper>
        {this.props.userTokenBalance.error &&
          <Message>Oops! We can't find that Ethereum address.</Message>
          // <SuccessMessage
          //   user={{
          //     id: "cj8yzvd1j8nt80126ic7ersqa",
          //     email: "shadi@gmail.com",
          //     ethereumAddress: "0x2837423749328423874324234324233333434343",
          //   }}
          //   tokenCount={340}
          // />
        }
        {!this.props.tokenCount.loading
          && !this.props.tokenCount.error
          && !this.props.userTokenBalance.loading
          && !this.props.userTokenBalance.error
          && <SuccessMessage
            user={this.state.user}
            tokenCount={this.props.tokenCount.tokenCount.count}
            userTokenBalance={this.props.userTokenBalance.userTokenBalance.count}
            ethereumAddress={this.props.match.params.ethereumAddress}
          />
        }
      </Wrapper>
    );
  }
}

export const BalancePage = compose(
  withRouter,
  graphql(TOKEN_COUNT_QUERY, { name: "tokenCount" }),
  (Component) => (props) => {
    const EnhancedComponent = graphql(USER_TOKEN_BALANCE_QUERY, {
      name: "userTokenBalance",
      options: {
        variables: {
          ethereumAddress: props.match.params.ethereumAddress,
        },
      },
    })(Component);
    return <EnhancedComponent {...props} />;
  },
)(BalancePagePresentational);