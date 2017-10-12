/**
 * Created by gopi on 1/8/17.
 */
import * as React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  margin: 1em 0em 2em;
  text-align: center;
	font-size: 2em;
`;

export default class Layout extends React.Component {
    render () {
		return (
			<div className="app-container">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<Header>
							TrustToken Giveaway	
							</Header>
						</div>
					</div>
				</div>
				<div className="app-content">{this.props.children}</div>
			</div>
		);
    }
}