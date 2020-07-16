import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


class Login extends Component {
    state = {
        value: '',
        loading: false
      }
    
      handleLoading = () => {
        this.setState({ loading: true });
      };
    
      // Form functions
      handleOnChange = (e) => {
        const selectValue = e.target.value
          this.setState(currentState => ({ 
            value: selectValue 
          }));
    
        };
      
      handleSubmit = (e) => {
        e.preventDefault();   
        
        const { value } = this.state
        const { dispatch, id } = this.props
        
        dispatch(setAuthedUser(value, id))
         this.setState(() => ({
          value:'' 
        }))
      }
    
      getOptions = () => {
        const { users } = this.props
        return users.map(user => ({   
          key: user.id,
          label: user.name,
          value: user.id,
          //image: { avatar: true, src: user.avatarURL }
        }))
      } 

    render(){
        const { value } = this.state
        const { users } = this.props
        const disabled = value === '' ? true : false        
        return (
            <div>
                <form onSubmit={this.handleSubmit} >
                <h2> Sign In </h2>

                <label htmlFor='userProfile'>Select a profile:</label>
                <select
                    id='userProfile'
                    name='userProfile'
                    placeholder="Select A Profile" 
                    onChange={this.handleOnChange}       
                >
                { users.map(user => (
                    <option 
                    key={user.value}
                    value={user.value}>
                    {user.label}
                    </option>
                    ))                
                }
                </select>
                <button 
                    type='submit' 
                    disabled={disabled} 
                >Login
                </button>
                </form>
            </div>
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
