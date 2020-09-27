import React, { Component } from 'react'
import { Button, Col, Row } from 'reactstrap'

class Navegador extends Component {
  state = {
    index: 0,
  }

  constructor() {
    super()
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
    
  }

  handleBack(event) {
    this.setState(
      {
        index: this.state.index - 1,
      },
      () => {
        this.props.handleNavigation(this.state.index)
      },
    )
  }

  handleNext(event) {
    this.setState(
      {
        index: this.state.index + 1,
      },
      () => {
        this.props.handleNavigation(this.state.index)
      },
    )
  }

  render() {
    return (
      <Row>
        <Col xs="6">
          {this.state.index === 0 ? null : (
            <Button
              className="float-right btn"
              color="primary"
              style={{ width: 100 }}
              onClick={this.handleBack}
            >
              <span className="icon-arrow-left"></span>
              Atras
            </Button>
          )}
        </Col>
        <Col xs="6">
          {this.state.index >= this.props.maxIndex ? null : (
            <Button
              className="btn"
              color="primary"
              style={{ width: 100 }}
              onClick={this.handleNext}
            >
              Adelante
              <span className="icon-arrow-right"></span>
            </Button>
          )}
        </Col>
      </Row>
    )
  }
}

export default Navegador
