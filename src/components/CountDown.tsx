import * as React from "react";
import * as moment from "moment";
import MediaQuery from "react-responsive";
import styled from "styled-components";

const Wrapper = styled.div`
	font-family: Roboto;
	color: #fff;
	display: inline-block;
	font-weight: 100;
	text-align: center;
  font-size: 30px;
  margin-left: 10px;
`;

const CounterPane = styled.div`
	padding: 10px;
	border-radius: 3px;
	background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin-left: 8px;
`;

const Readout: any = styled.span`
  padding: 15px;
  font-size: ${(props: any) => props.large ? "60px" : "35px"};
	border-radius: 3px;
	background: rgba(0, 0, 0, 0.1);
	display: inline-block;
`;

const Label: any = styled.div`
	padding-top: 5px;
  font-size: ${(props: any) => props.large ? "14px" : "10px"};
  letter-spacing: 2px;
`;

function getTimeRemaining(deadline: moment.Moment) {
  let remaining = moment.duration(deadline.diff(moment()));
  const days = remaining.days();
  remaining = remaining.subtract(days, "d");
  const hours = remaining.hours();
  remaining = remaining.subtract(hours, "h");
  const minutes = remaining.minutes();
  remaining = remaining.subtract(minutes, "m");
  const seconds = remaining.seconds();
  return { days, hours, minutes, seconds };
}

class CountDown extends React.Component<any, any> {
  public constructor(props: { deadline: Date }) {
    super(props);
    this.state = getTimeRemaining(this.props.deadline);
  }

  public componentDidMount() {
    setInterval(() => this.updateClock(), 1000);
  }

  public render() {
    return (
      <div>
        <MediaQuery query="(min-width: 550px)">
          {this.renderCountDown(true)}
        </MediaQuery>
        <MediaQuery query="(max-width: 550px)">
          {this.renderCountDown(false)}
        </MediaQuery>
      </div>
    );
  }

  private renderCountDown(large: boolean) {
    return (
      <Wrapper>
        <CounterPane>
          <Readout large={large}>{this.state.days}</Readout>
          <Label large={large}>Days</Label>
        </CounterPane>
        <CounterPane>
          <Readout large={large}>{this.state.hours}</Readout>
          <Label large={large}>Hours</Label>
        </CounterPane>
        <CounterPane>
          <Readout large={large}>{this.state.minutes}</Readout>
          <Label large={large}>Minutes</Label>
        </CounterPane>
        <CounterPane>
          <Readout large={large}>{this.state.seconds}</Readout>
          <Label large={large}>Seconds</Label>
        </CounterPane>
      </Wrapper>
    );
  }

  private updateClock() {
    this.setState(getTimeRemaining(this.props.deadline));
  }

}

export { CountDown };