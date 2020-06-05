import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import profileImg from '../assets/profile.png';

class AdminResearchBox extends PureComponent {
    removePost(test) {
        
        axios.delete(`/api/research_posts/remove/${test}`)
          .then(window.location.reload(false))
          .catch((err) => {
            console.log(err);
            alert('Failed to delete post');
          });
        
      }

    
  render() {
    const { research } = this.props;
    
    return (
        <div className="column is-full">
            <div className="box">
                <div className="columns">
                    <div className="column is-one-half">

                        <h1 className="title is-5">{research.name}</h1>
                        <Link className="subtitle is-size-7 card-footer-item has-text-primary" to={research.ownerProfile}>
                            {research.professor}
                        </Link>  
                        
                    </div>
                    <div className="column is-one-quarter">
                        <Link className="button is-fullwidth is-primary is-outlined" to={`/post/${research.id}`}>
                            {'Edit Post'}
                        </Link>
                        
                    </div>

                    <div className="column is-one-quarter">
                        <button
                            className={`button is-fullwidth ${true ? 'is-danger is-outlined' : 'is-link'}`}
                            onClick={() => this.removePost(research.id)}
                        >
                            {'Remove Post'}
                        </button>
                        
                    </div>

                </div>
                      
            </div>
        </div>

      
    );
  }
}

export default withRouter(AdminResearchBox);
