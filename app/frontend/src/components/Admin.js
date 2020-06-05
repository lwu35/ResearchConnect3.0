import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import AdminUserBox from './AdminUserBox';
import AdminDeptBox from './AdminDeptBox';
import AdminResearchBox from './AdminResearchBox';

import Spinner from './Spinner';


export default class Admin extends Component {


  constructor(props) {
    super(props);

    this.state = {
      allPosts: [],
      posts: [],
      loading: false,

      allDepts: [],
      depts: [],
      loadingDept: false,

      allResearchs: [],
      researchs: [],
      loadingResearch: false,

      allPages: [],
      pages: [],
      loadingPage: false,

      totalPages: null,
      currentPage: 1,
      pageLimit: 50,

      userDefaultView: false,

    };
    this.handleClick = this.handleClick.bind(this);


  }

  handleClick(event) {
    const fetchUsers = async () => {
      const res = await axios.get(`/api/users/pages?limit=${this.state.pageLimit}&page=${event.target.id}`);
      this.setState({

        pages: res.data.users,
      });
    };
    fetchUsers();
    this.setState({
      currentPage: Number(event.target.id),

    });
  }





  handleFilterChange = (event) => {

    const { value } = event.target;
    const { allPosts } = this.state;
    const f = value.trim().toLowerCase();
    if (!f) {
      console.log("default")

      return this.setState(prevState => ({
        posts: prevState.allPosts,
        userDefaultView: false,
      }));
    }

    const filteredPosts = allPosts.filter((post) => {
      // console.log(post)

      return (
        post.name.toLowerCase().includes(f) ||
        post.cruzid.toLowerCase().includes(f) ||
        false
      )
    });

    return this.setState({
      posts: filteredPosts,
      userDefaultView: true,
    });

  }

  handleFilterChange3 = (event) => {

    const { value } = event.target;
    const { allResearchs } = this.state;
    const f = value.trim().toLowerCase();
    if (!f) {

      return this.setState(prevState => ({
        researchs: prevState.allResearchs,
      }));
    }

    const filteredPosts = allResearchs.filter((post) => {
      //console.log(post)

      return (

        post.department.name.toLowerCase().includes(f) ||
        post.owner.cruzid.toLowerCase().includes(f) ||
        post.owner.name.toLowerCase().includes(f) ||
        post.title.toLowerCase().includes(f) ||
        false
      )
    });

    return this.setState({
      researchs: filteredPosts,
    });



  }

  componentDidMount() {
    this.getUsers();
    this.getDepartments();
    this.getResearchs();
    this.getUserPage(this.state.currentPage);
  }



  getUserPage(currentPage) {
    const { pages, loadingPage } = this.state;
    this.setState({
      allPages: pages,
      pages,
      loadingPage: true,
      totalPages: null,
    });


    axios.get(`/api/users/pages?limit=${this.state.pageLimit}&page=${currentPage}`)
      .then((response) => {
        this.setState({
          allPages: response.data,
          pages: response.data.users,
          loadingPage: false,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
        }, () => console.log(this.state.loadingPage));
        // this.closePosts();
      })
      .catch((error) => {
        // console.log(error);
        this.setState({
          allPages: pages,
          pages,
          loadingPages: false,
        });
      });

  }



  getUsers() {
    const { posts, loading } = this.state;
    this.setState({
      allPosts: posts,
      posts,
      loading: true,
    });

    axios.get('/api/users/list')
      .then((response) => {
        this.setState({
          allPosts: response.data,
          posts: response.data,
          loading: false,
        }, () => console.log(this.state.loading));
        // this.closePosts();
      })
      .catch((error) => {
        // console.log(error);
        this.setState({
          allPosts: posts,
          posts,
          loading: false,
        });
      });
  }

  getDepartments() {
    const { depts, loadingDept } = this.state;
    this.setState({
      allDepts: depts,
      depts,
      loadingDept: true,
    });

    axios.get('/api/department/')
      .then((response) => {
        this.setState({
          allDepts: response.data,
          depts: response.data,
          loadingDept: false,
        }, () => console.log(this.state.loadingDept));
        // this.closePosts();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          allDepts: depts,
          depts,
          loadingDept: false,
        });
      });
  }

  getResearchs() {
    const { researchs, loadingResearch } = this.state;
    this.setState({
      allResearchs: researchs,
      researchs,
      loadingResearch: true,
    });

    axios.get('/api/research_posts?fill=true')
      .then((response) => {
        this.setState({
          allResearchs: response.data,
          researchs: response.data,
          loadingResearch: false,
        }, () => console.log(this.state.loadingResearch));
        // this.closePosts();
      })
      .catch((error) => {
        // console.log(error);
        this.setState({
          allResearchs: researchs,
          researchs,
          loadingResearch: false,
        });
      });

  }

  formatPost() {
    const { pages } = this.state;

    return (
      <React.Fragment>
        {pages.map(post => (
          <AdminUserBox
            key={post._id}
            user={{
              id: post._id,
              name: post.name,
              cruzid: post.cruzid,
              email: post.email,
              isProfessor: post.isProfessor,

            }}
          />
        ))}
      </React.Fragment>
    );
  }

  formatPostSearch() {
    const { posts } = this.state;

    return (
      <React.Fragment>
        {posts.map(post => (
          <AdminUserBox
            key={post._id}
            user={{
              id: post._id,
              name: post.name,
              cruzid: post.cruzid,
              email: post.email,
              isProfessor: post.isProfessor,

            }}
          />
        ))}
      </React.Fragment>
    );
  }

  formatDept() {
    const { depts } = this.state;

    return (
      <React.Fragment>
        {depts.map(dept => (
          <AdminDeptBox
            key={dept._id}
            dept={{
              deptId: dept._id,
              deptName: dept.name,
              deptType: dept.type,
            }}
          />
        ))}
      </React.Fragment>
    );
  }

  formatResearch() {
    const { researchs } = this.state;
    return (
      <React.Fragment>
        {researchs.map(research => (
          <AdminResearchBox
            key={research._id}
            research={{
              id: research._id,
              name: research.title,
              professor: research.owner.name,
              ownerProfile: `/profile/${research.owner.cruzid}`,
            }}
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { posts, currentPage, pageLimit } = this.state;

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / pageLimit); i++) {
      pageNumbers.push(i);
    }


    const renderPageNumbers = pageNumbers.map(number => {
      if (number == Number(this.state.currentPage)) {
        return (
          <li>
            <a class="pagination-link is-current" aria-current="page" id={number} onClick={this.handleClick}>{number}</a>
          </li>
        );
      }
      else {
        return (
          <li>
            <a class="pagination-link" id={number} onClick={this.handleClick}>{number}</a>
          </li>
        );
      }
    });


    return (
      <section className="section">

        <div className="container has-text-centered">
          <Tabs>
            <TabList>

              <Tab>Users</Tab>
              <Tab>Department</Tab>
              <Tab>Research Posts</Tab>

            </TabList>

            <TabPanel>
              <div>
                Manage Users: {this.state.posts.length}
                <div className="columns">
                  <div className="column" style={{ marginBottom: '1em' }}>
                    <div className="field">
                      <div className="control">
                        <input className={`input is-medium`} type="text" placeholder="Filter by name or cruzid..." onChange={this.handleFilterChange} />
                      </div>
                    </div>
                  </div>
                </div>

                {this.state.userDefaultView ? "Search results..." : <nav class="pagination" role="navigation" aria-label="pagination">
                  <ul class="pagination-list">
                    {renderPageNumbers}

                  </ul>
                </nav>}
                {this.state.userDefaultView ? this.formatPostSearch() : this.formatPost()}
              </div>
            </TabPanel>

            <TabPanel>
              <div>
                <label className="label">Add New Department:</label>

                <div class="columns">
                  <div class="column is-four-fifths">
                    <input name="title" className="input" type="text" placeholder="Name..." value={this.state.newDept} onChange={e => this.change(e)} />
                  </div>
                  <div class="column">
                    <button className="button is-success">Submit</button>
                  </div>
                </div>
                <hr></hr>
                Manage Departments: {this.state.depts.length}
                {this.formatDept()}
              </div>

            </TabPanel>
            <TabPanel>
              <div>
                Manage Posts: {this.state.researchs.length}
                <div className="columns">
                  <div className="column" style={{ marginBottom: '1em' }}>
                    <div className="field">
                      <div className="control">
                        <input className={`input is-medium`} type="text" placeholder="Filter by title or tags..." onChange={this.handleFilterChange3} />
                      </div>
                    </div>
                  </div>
                </div>
                {this.formatResearch()}
              </div>

            </TabPanel>


          </Tabs>

        </div>
      </section>
    );
  }
}


