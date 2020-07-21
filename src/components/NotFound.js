import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap'

// Message displayed if a page is not found with a button home
const NotFound = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>404 - page not found</h1>
          <Button href='/' variant='primary'>Return Home</Button>
        </Col>
      </Row>
    </Container>

  )
}

export default NotFound;