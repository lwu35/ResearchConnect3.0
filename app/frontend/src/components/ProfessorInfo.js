import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import * as actions from '../actions';

import Spinner from './Spinner';
import InfoPage from './ProfessorInfoPage';
import PostCard from './PostCard';

class Profile extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      loading: false,
      researchLoaded: false,
      profileLoaded:false
    };

    this.setProfileStates();
  }

  componentDidMount() {
    this.setProfileStates();
  }

  componentDidUpdate() {
    this.setProfileStates();
    
  }

  setProfileStates() {
    // Fetch and set user specific data to local states
    axios
      .get('/api/active_faculty_members/', {
        params: {
          cruzid: this.props.match.params.cruzid,
        },
      })
      .then(response => this.setState({
        profile: response.data,
        profileLoaded: true,
      }))
      .catch(error => console.log(error));
    
    axios
      .get('/api/search?type=cruzid&query=' + this.props.match.params.cruzid)
      .then(response => this.setState({
        research: response.data,
        researchLoaded: true,
      }))
      .catch(error => console.log(error));
  }

  
  fetchResearchPosts = () => {
    const research_posts = this.state.research.map(research => (
      <div key={research._id} className="box">
        <h1 align="left">{`Title: ${research.title}`}</h1>
        <br />
        <h2 align="left">{`Summary: ${research.summary}`}</h2>
        <br />
        <Link className="card-footer-item info" to={`/post/${research._id}`}>Learn More</Link>
      </div>
    ));

    return (
      <ul>{research_posts}</ul>
    );
  }

  formatPost(posts, mod, eq) {
    return (
      <React.Fragment>
        {posts.filter((_, index) => (index % mod) === eq).map(post => (
          <PostCard
            key={post._id}
            post={{
              id: post._id,
              type: post.department.type,
              name: post.title,
              professor: post.owner.name,
              tags: post.tags,
              summary: post.summary,
              department: post.department.name,
              ownerProfile: "/profile/" + post.owner.cruzid,
              deadline: post.deadline,
              date: new Date(post.deadline),
              applicants: this.props.auth.isProfessor ? post.applicants.map(applicant => applicant.student ? applicant.student.cruzid : "") : null
            }}
          />
        ))}
      </React.Fragment>
    )
  }
  

  displayProfessorProfile() {
    const post = this.state.profile;
    
    return (
      <InfoPage
        user={{
          id: post._id,
          profile_pic: post.pic,
          name: post.name,
          cruzid: post.cruzid,
          page: post.page,
          email: post.email,
          interest: post.interest,
          title: post.title,
          pub_name: post.pub_name,
          pub_link: post.pub_link,
          bio: post.bio,
          office_location: post.office_location,
          department: post.department,
          contact: post.contact,
          pic: post.pic
        }}
      />
    );
  }

  render() {
    if (!this.state.profileLoaded || !this.state.researchLoaded) {
      return <Spinner fullPage />;
    }

    const { research: posts } = this.state;

    return (
      <section className="section">
        
        <div className="container has-text-centered">
          <Tabs>
            <TabList>
              <Tab>Professor</Tab>
              <Tab>Projects</Tab>
            </TabList>

            <TabPanel>
              {this.displayProfessorProfile()}
            </TabPanel>

            <TabPanel>
              {this.state.researchLoaded ? (
                <div>
                  {posts.length ? (
                    <div className="columns is-multiline" style={{ paddingTop: '1em' }}>
                      <div className="column is-one-third">
                        {this.formatPost(posts, 3, 0)}
                      </div>
                      <div className="column is-one-third">
                        {this.formatPost(posts, 3, 1)}
                      </div>
                      <div className="column is-one-third">
                        {this.formatPost(posts, 3, 2)}
                      </div>
                    </div>
                  ) : (
                      <h1 className="title">Nothing here yet!</h1>
                    )}
                </div>
              ) : <Spinner fullPage />}
            </TabPanel>

          </Tabs>

        </div>
      </section>
    );
  }
}

function mapStateToProps({ auth, profile }) {
  return { auth, profile };
}

export default connect(
  mapStateToProps,
  actions,
)(Profile);
