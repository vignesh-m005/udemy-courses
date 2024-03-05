import { Component } from "react";

class ErrorBoundry extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }
  componentDidCatch(error) {
    console.log(error);
    this.setState({
      hasError: true,
    });
  }
  render() {
    return <>{this.state.hasError ? "Error Occurred" : this.props.children}</>;
  }
}

export default ErrorBoundry;
