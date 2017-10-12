// import * as React from 'react';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
// import { Link } from 'react-router';
// import { withRouter } from 'react-router'
// import { compose } from "recompose"

// class ConfirmEmailPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: true,
//             hasError: false,
//             user: {},
//         }
//     }

//     componentWillMount() {
//         this.props.confirmEmail({ variables: { confirmationToken: this.props.routeParams.confirmationToken } })
//             .then((user) => {
//                 this.props.router.replace('/')
//             }).catch((err) => {
//                 this.setState({ isLoading: false, hasError: true })
//                 console.log("Error", err)
//             });
//     }

//     render() {
//         return (
//             <div className='container'>
//                 {this.state.hasError &&
//                     "Error! Bad code. "
//                 }
//                 {this.state.isLoading && !this.state.hasError &&
//                     "Confirming..."
//                 }
//                 {!this.state.isLoading && !this.state.hasError &&
//                     "Confirmed!"
//                 }
//             </div>
//         )
//     }
// }

// const confirmEmail = gql`
//     mutation confirmEmail($confirmationToken: String!) {
//         confirmEmail(confirmationToken: $confirmationToken){
//            id 
//         }
//     }
// `

// const ConfirmEmailPageWithMutations = compose(
//     graphql(confirmEmail, { name: "confirmEmail" }),
//     withRouter
// )(ConfirmEmailPage)

// export default ConfirmEmailPageWithMutations
