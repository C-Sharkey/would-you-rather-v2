import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
 
// gets user data, populates a select drop down
// the submited user is set to 'authedUser'
// when authedUser === true, page displays dash component

class Login extends Component {
    state = {
        value: '',
      }
      // state holds select value
    
      // Sets state.value to selected value
      handleOnChange = (e) => {
        const selectValue = e.target.value
          this.setState(currentState => ({ 
            value: selectValue 
          }));
    
        };
      
      // submited form dispatches authedUser to store & resets state
      handleSubmit = (e) => {
        e.preventDefault();     
        const { value } = this.state
        const { dispatch, id } = this.props
        
        dispatch(setAuthedUser(value, id))
         this.setState(() => ({
          value:'' 
        }))
      }
    
      // Maps through users to populate dropdown
      getOptions = () => {
        const { users } = this.props
        return users.map(user => ({   
          key: user.id,
          label: user.name,
          value: user.id,
        }))
      } 

    render(){
        const { value } = this.state
        const { users } = this.props
        const disabled = value === '' ? true : false        
        return (

          <Container>
            <Row>
              <Col>
              <h1>Would you rather?</h1>
                <Form onSubmit={this.handleSubmit} className='mt-4'>               
                  <h2 className='mt-4'> Sign In </h2>
                    <Form.Label className='mt-4'>Profile</Form.Label>
                    <Form.Control as="select" defaultValue="Select a profile..." onChange={this.handleOnChange}>
                      <option>Select a profile...</option>
                      { users.map(user => (
                          <option 
                            key={user.value}
                            value={user.value}>
                            {user.label}
                          </option>
                          ))                
                      }
                    </Form.Control>            
                    <Button variant="primary" type="submit" disabled={disabled} className='mt-4'> Submit </Button>               
                </Form>
              </Col>
            </Row>
          </Container>

        )
    }
}


function mapStateToProps ({ users }) {
    return {
      users: Object.values(users).map((user) => {
        return {
            value: user.id, 
            label: user.name 
        }
      })
    }
  }

export default connect(mapStateToProps)(Login)
