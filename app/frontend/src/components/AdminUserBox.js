import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import profileImg from '../assets/profile.png';

class AdminUserBox extends PureComponent {
    makeProfessor() {
        console.log("test make professor function")
    }

    removeUser(userId) {
        console.log("test remove user function");
        console.log(userId);
        
        axios.delete(`/api/users/remove/${userId}`)
          .then(window.location.reload(false))
          .catch((err) => {
            console.log(err);
            alert('Failed to delete post');
          });
    }
  render() {
    const { user } = this.props;
    

    return (
        <div className="column is-full">
            <div className="box">
                <div className="columns">
                    <div className="column is-one-half">
                        
                        <Link className="title is-5 card-footer-item has-text-primary" to={`/profile/${user.cruzid}`}>
                            {user.name}
                        </Link>
                        <h1 className="subtitle is-size-7">{user.isProfessor ? 'Faculty' : 'Student'}</h1>
                     
                        
                        
                            
                        
                    </div>
                    <div className="column is-one-quarter">
                        <button
                            className={`button is-fullwidth ${true ? 'is-primary is-outlined' : 'is-link'}`}
                            onClick={() => this.makeProfessor()}
                        >
                            {user.isProfessor ? 'Make Student' : 'Make Professor'}
                        </button>
                        
                    </div>

                    <div className="column is-one-quarter">
                        <button
                            className={`button is-fullwidth ${true ? 'is-danger is-outlined' : 'is-link'}`}
                            onClick={() => this.removeUser(user.id)}
                        >
                            {'Remove User'}
                        </button>
                        
                    </div>

                </div>
                      
            </div>
        </div>

      
    );
  }
}

export default withRouter(AdminUserBox);
