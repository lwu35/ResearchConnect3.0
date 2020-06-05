import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import profileImg from '../assets/profile.png';
import ResumeForm from './ResumeForm';
import Spinner from './Spinner';

class StudentProfile extends Component {
  componentDidMount() {
    this.checkFollowers();
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isFollowDisabled: this.props.isFollowDisabled,
      endorsements: this.props.student.endorsements,
      showEndorsements: false,
    };
  }

  checkFollowers = () => {
    axios
      .get('/api/users/', {
        params: {
          cruzid: this.props.auth.cruzid,
        },
      })
      .then((res) => {
        if (res.data.following && res.data.following.includes(this.props.match.params.cruzid)) {
          this.setState({
            following: true,
            loading: false,
          });
        } else {
          this.setState({
            following: false,
            loading: false,
          });
        }
      });
  }

  toggleFollow = (_) => {
    const following = this.state.following;
    this.setState({ isFollowDisabled: false });
    this.setState({ following: !this.state.following });

    axios
      .post('/api/follow', {
        cruzid: this.props.match.params.cruzid,
        following,
      })
      .then(_ => this.setState({ isFollowDisabled: false }))
      .catch((error) => {
        console.log(error);
        this.setState({ following });
      });
  };

  uploadResume(resume) {
    this.props.uploadResume(resume);
  }

  endorsed() {
    return this.state.endorsements && this.state.endorsements.includes(this.props.auth.cruzid);
  }

  setEndorsed(val) {
    var { endorsements } = this.state;
    if (!endorsements) {
      endorsements = [];
    }

    var request = null;

    if (val && !this.endorsed()) {
      request = {
        id: this.props.student.id,
        endorse: true,
      };

      endorsements.push(this.props.auth.cruzid);
    } else if (!val && this.endorsed()) {
      request = {
        id: this.props.student.id,
        endorse: false,
      };

      endorsements = endorsements.filter(value => value !== this.props.auth.cruzid);
    }

    if (request) {
      axios.post('/api/endorse', request).then().catch(err => {
        console.log(err);
      });

      this.setState({
        endorsements: endorsements,
      });
    }
  }

  getEndorsers() {
    return (
      <table class="table is-bordered">
        <tbody>
          {this.state.endorsements.map(endorser => (
            <tr><td><Link key={endorser} className="subtitle is-6 has-text-link" to={"/profile/" + endorser}>{endorser}</Link></td></tr>
          ))}
        </tbody>
        <br />
      </table>)
  }

  render() {
    const myProfile = this.props.profile.cruzid === this.props.auth.cruzid;

    if (this.state.loading) {
      return <Spinner fullPage />;
    }

    return (
      
      <div id={this.props.profile.cruzid} className="container">

        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {this.props.profile.name}
              </h1>
              <h2 className="subtitle">
                Student
              </h2>              
            </div>
          </div>
        </section>
        
        <div className="columns">
          <div className="column is-12">
            <div className="column" align="center">
              

              {this.props.auth.isProfessor && (
                <div className="columns">
                  <div className="column is-one-third">
                    <button
                      className={`button is-fullwidth ${this.endorsed() ? 'is-danger is-outlined' : 'is-link'}`}
                      onClick={() => this.setEndorsed(!this.endorsed())}
                    >
                      {this.endorsed() ? 'Unendorse' : 'Endorse'}
                    </button>
                  </div>
                  <div className="column">
                    <button
                      className='button is-link is-fullwidth is-outlined'
                      onClick={() => this.setState({ showEndorsements: !this.state.showEndorsements })}
                      disabled={!this.state.endorsements || this.state.endorsements.length === 0}
                    >
                      {'Endorsed by ' + (this.state.endorsements ? this.state.endorsements.length : 0) + ' professors'}
                    </button>
                  </div>
                </div>
              )}

              {this.state.showEndorsements &&
                <div>
                  {this.getEndorsers()}
                </div>}

              {!myProfile && (
                <div>
                  <button
                    id={this.props.profile.cruzid}
                    className={`button ${this.state.following ? 'is-link' : 'is-danger is-outlined'}`}
                    disabled={this.state.isFollowDisabled}
                    onClick={this.toggleFollow}
                  >
                    {this.state.following ? 'Following' : 'Unfollow'}
                  </button>
                  <br />
                </div>
              )}

              <br />

              <div className="columns">
                <div className="column is-5">
                  <div className="box " align="left" style={{height: "570px"}}>

                  
                  <h1 align="center">
                    <div align="center">
                      <figure className="image is-256x256">
                        <img
                          className="is-rounded"
                          src={
                            this.props.profile.profile_pic
                            ? this.props.profile.profile_pic
                            : profileImg
                          }
                          alt={this.props.profile.name}
                          style={{height: "256px", width: "auto"}}
                        />
                        </figure>
                      </div>
                  </h1>

                 
                  <hr />

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-three-quarter">
                            <h2 className="title is-5 is-uppercase has-text-primary	">Gender:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-6" align="right">{true ? "Male" : 'No Gender Listed'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-three-quarter">
                            <h2 className="title is-5 is-uppercase has-text-primary	">Year:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-6" align="right">{true ? "Senior" : 'No Year Listed'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>
  
                  </div>
                </div>
                
                <div className="column is-7">
                  <div className="box" align="left" style={{height: "570px"}} >

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-one-quarter">
                            <h2 className="title is-5 is-uppercase has-text-primary	">Bio:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-6" 
                              style={{overflow:"auto"}}
                            >{this.props.profile.bio ? this.props.profile.bio : 'No Available Bio'}</h1>
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
                            <h1 className="subtitle is-size-6" align="right">{this.props.profile.email ? this.props.profile.email : 'No Email Listed'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-one-quarter">
                            <h2 className="title is-5 is-uppercase has-text-primary">Major:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-6" align="right">{this.props.profile.major ? this.props.profile.major : 'No Major Listed'}</h1>
                          </div>

                        </div>
                      
                      </div>
                    </div>

                    <div className="column is-full">
                      {myProfile && this.props.auth && (
                        <div className="box">
                          <div className="columns">
                            <div className="column is-one-quarter">
                              <h1 className="title is-uppercase is-5 has-text-primary" style={{ marginBottom: '0px' }}>Upload Resume:</h1>
                            </div>

                            <div className="column">
                            
                              <ResumeForm
                                onSubmit={data => this.uploadResume(data.file)}
                              />
                              <a
                                href={this.props.resume}
                                className="button is-info"
                                target="_blank"
                                rel="noopener noreferrer"
                                download={`${this.props.profile.name}_Resume.pdf`}
                                disabled={!this.props.resume}
                              >
                                {this.props.resume ? 'View Resume' : 'No Resume Available'}
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>  
                </div>

              </div>
              
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default withRouter(StudentProfile);
