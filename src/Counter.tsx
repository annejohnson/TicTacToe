import React from 'react';

type CounterProps = {
  startValue: number;
};

type CounterState = {
  currentValue: number;
};

export default class Counter extends React.Component<
  CounterProps, CounterState
> {
  private timerID: undefined | NodeJS.Timer;

  constructor(props: CounterProps) {
    super(props);
    this.state = { currentValue: props.startValue };
  }

  tick() {
    const { currentValue } = this.state;
    this.setState({ currentValue: currentValue + 1 });
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
      this.timerID = undefined;
    }
  }

  render() {
    return (
      <div>
        {this.state.currentValue} seconds
      </div>
    );
  }
}
