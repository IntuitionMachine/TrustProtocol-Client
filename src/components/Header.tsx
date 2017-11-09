
/**
 * Created by gopi on 1/8/17.
 */
import * as React from "react";
import styled from "styled-components";

const TRUST_TOKEN_URL = "https://www.trusttoken.com/";

export class Header extends React.Component {
  public render() {
    return (
        <nav>
            <div className="container">
            <a href={`${TRUST_TOKEN_URL}`} target="_blank" className="logo">
                <img src="/images/trusttoken-logo.svg" alt="Trust Token" />
            </a>
            <div className="links-container">
                <a href={`${TRUST_TOKEN_URL}`} target="_blank">Home</a>
                <a href="https://blog.trusttoken.com/" target="_blank">Blog</a>
                <a href="mailto:hello@trusttoken.com" className="email-link">hello@trusttoken.com</a>
                <a href="https://twitter.com/TrustToken" target="_blank"><div className="social-icon twitter"/></a>
                <a href="https://www.facebook.com/TrustToken/?fref=ts" target="_blank"><div className="social-icon facebook"/></a>
                <a href="https://github.com/trusttoken"><div className="social-icon github-social"/></a>
                <a href="mailto:hello@trusttoken.com"><div className="social-icon email"/></a>
            </div>
            </div>
        </nav>
    );
  }
}