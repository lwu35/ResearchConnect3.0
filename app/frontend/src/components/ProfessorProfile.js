import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import profileImg from '../assets/profile.png';
import Spinner from './Spinner';

class ProfessorProfile extends Component {
  componentDidMount() {
    this.checkFollowers();
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isFollowDisabled: this.props.isFollowDisabled,
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

  render() {
    const myProfile = this.props.profile.cruzid === this.props.auth.cruzid;

    if (this.state.loading) {
      return <Spinner fullPage />;
    }

    return (
      <div id={this.props.profile.cruzid} className="container">
        <section class="hero is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                {this.props.profile.name}
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

              <br />

              <div className="columns">
                <div className="column is-5">
                  <div className="box " align="left" style={{ height: "570px" }}>


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
                            style={{ height: "256px", width: "auto" }}
                          />
                        </figure>
                      </div>
                    </h1>


                    {!myProfile && (
                      <div>
                        <button
                          className={`button is-link ${this.state.following ? '' : 'is-inverted'}`}
                          disabled={this.state.isFollowDisabled}
                          onClick={this.toggleFollow}
                        >
                          {this.state.following ? 'Following' : 'Follow'}
                        </button>
                        <br />
                        <br />
                      </div>
                    )}


                    <hr />

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-three-quarter">
                            <h2 className="title is-5 is-uppercase has-text-primary	">Title:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-6" align="right">{this.props.professor.title ? this.props.professor.title : 'No Title Listed'}</h1>
                          </div>

                        </div>

                      </div>
                    </div>


                  </div>
                </div>

                <div className="column is-7">
                  <div className="box" align="left" style={{ height: "570px" }} >

                    <div className="column is-full">
                      <div className="box">
                        <div className="columns">
                          <div className="column is-one-quarter">
                            <h2 className="title is-5 is-uppercase has-text-primary	">Bio:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-6"
                              style={{ overflow: "auto" }}
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
                          <div className="column is-one-half">
                            <h2 className="title is-5 is-uppercase has-text-primary">Department:</h2>
                          </div>
                          <div className="column">
                            <h1 className="subtitle is-size-6" align="right">{this.props.professor.department ? this.props.professor.department : 'No Department Listed'}</h1>
                          </div>

                        </div>

                      </div>
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

export default withRouter(ProfessorProfile);
