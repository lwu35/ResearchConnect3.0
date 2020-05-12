import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import profileImg from '../assets/profile.png';

class AdminDeptBox extends PureComponent {
    editDept() {
        console.log("test editDept function")
    }

  render() {
    const { dept } = this.props;
  

    return (
        <div className="column is-full">
            <div className="box">
                <div className="columns">
                    <div className="column is-one-half">
                        <h1 className="subtitle is-size-5">{dept.deptName}</h1>
                    
                    </div>
                    <div className="column is-one-quarter">
                        <button
                            className={`button is-fullwidth ${true ? 'is-primary is-outlined' : 'is-link'}`}
                            onClick={() => this.editDept()}
                        >
                            {'Edit'}
                        </button>
                        
                    </div>

                   

                </div>
                      
            </div>
        </div>

      
    );
  }
}

export default withRouter(AdminDeptBox);
