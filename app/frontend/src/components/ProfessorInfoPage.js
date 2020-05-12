import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import profileImg from '../assets/profile.png';
import Spinner from './Spinner';

class ProfessorInfoPage extends Component {

  displayPubLink(){
    const { user } = this.props;
    const listpub_link = user.pub_link.map((link) =>
      <li><a href={link} target="_blank">Link</a></li>  
    );

    return (
      <ul>{listpub_link}</ul>
    );  
  }

  displayPubName(){
    const { user } = this.props;
    const listpub_name = user.pub_name.map((name) =>
      <li>{name}</li>
    );
    return (
      <ul>{listpub_name}</ul>
    );  
  }
  
  render() {
    const { user } = this.props;

    return (
      <div id={user.cruzid} className="container">
        <section class="hero is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                {user.name}
              </h1>
              <h2 class="subtitle">
                Faculty Member
              </h2>              
            </div>
          </div>
        </section>

        <div className="columns">
          <div className="column is-12">
            <div className="column" align="center">
              
              
              <div className="columns">
                <div className="column is-5">
                  <div className="box " align="left" style={{height: "750px"}}>

                  <h1 align="center">
                <br />
                <div align="center">
                  <figure className="image is-256x256">
                    <img
                      className="is-rounded"
                      src={
                        user.pic
                          ? user.pic
                          : profileImg
                      }
                      alt={user.name}
                      style={{height: "256px", width: "auto"}}
                    />
                  </figure>
                </div>
              </h1>
                    
                    <hr />

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-one-quarter">
                            <h2 className="title is-5 is-uppercase has-text-primary">Bio:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-5" 
                              style={{height: "300px", overflow:"auto"}}
                            >{user.bio ? user.bio : 'Sorry, the professor does not have a bio at this time. Check back later  (•◡•) /'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>
                    
               
                  </div>
                </div>
                
                <div className="column is-7">
                  <div className="box" align="left" style={{height: "750px"}} >

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-one-quarter">
                            <h2 className="title is-5 is-uppercase has-text-primary">Title:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-5">{user.title ? user.title : 'No Title Listed'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-one-quarter">
                            <h2 className="title is-5 is-uppercase has-text-primary">Email:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-5">{user.email ? user.email : 'No Email Listed'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-two-fifth">
                            <h2 className="title is-5 is-uppercase has-text-primary">Department:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-5">{user.department ? user.department : 'No Department Listed'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-one-half">
                            <h2 className="title is-5 is-uppercase has-text-primary">Office Location:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-5">{user.office_location ? user.office_location : 'No Office Location Listed'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-one-half">
                            <h2 className="title is-5 is-uppercase has-text-primary">Contact Preference:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-5">{user.contact ? user.contact : 'No Contact Preference Listed'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>

                   
                  </div>  
                </div>

              </div>

              <div className="box">
                <h2 className="title is-5 is-uppercase has-text-primary" align="left" >Publications</h2>
                <h1 className="subtitle is-size-5">{user.pub_name ? 
                <div className="columns">
                  <div className="column is-10" align="left">
                  {this.displayPubName()}
                  </div>
                  
                  <div className="column is-2" align="right">
                  {this.displayPubLink()}
                  </div>
                </div> : 'No Available Publications'}</h1>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default withRouter(ProfessorInfoPage);

