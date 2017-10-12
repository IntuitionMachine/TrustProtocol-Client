import * as React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { compose } from "recompose";

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
        console.log(this.props);
        this.props.confirmEmail({ variables: { confirmationToken: this.props.match.params.confirmationToken } })
            .then((user) => {
                this.setState({ isLoading: false, hasConfirmed: true });
            }).catch((err) => {
                this.setState({ isLoading: false, hasError: true });
            });
    }

    public render() {
        return (
            <div className="container">
                {this.state.hasError &&
                    "Error! Bad code. "
                }
                {this.state.isLoading && !this.state.hasError &&
                    "Confirming..."
                }
                {this.state.hasConfirmed &&
                    "You've confirmed your account!"
                }
            </div>
        );
    }
}

const confirmEmail = gql`
    mutation confirmEmail($confirmationToken: String!) {
        confirmEmail(confirmationToken: $confirmationToken){
           id 
        }
    }
`;

export const ConfirmEmailPageWithMutations = compose(
    graphql(confirmEmail, { name: "confirmEmail" }),
    withRouter
)(ConfirmEmailPage);