import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import AdminUserBox from './AdminUserBox';
import AdminDeptBox from './AdminDeptBox';
import AdminResearchBox from './AdminResearchBox';
import * as actions from '../actions';

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
        
        totalPages: 10,
        pageState: 1,



        
      };

  }

  componentDidMount() {
    this.getUsers();
    this.getDepartments();
    this.getResearchs();
    this.getUserPage(1);
  }

  getUserPage(currentPage) {
    const { pages, loadingPage } = this.state;
    this.setState({
      allPages: pages,
      pages,
      loadingPage: true,
      totalPages: 10,
    });

    axios.get(`/api/users/pages?page=${currentPage}`)
      .then((response) => {
        this.setState({
          allPages: response.data,
          pages: response.data.users,
          loadingPage: false,
          totalPages: response.data.totalPages,
        }, () => console.log(this.state.pages.users));
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
        }, () => console.log(this.state.posts));
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
                    All Users
                    <nav class="pagination" role="navigation" aria-label="pagination">
                        <a class="pagination-previous" title="This is the first page" disabled>Previous</a>
                        <a class="pagination-next">Next page</a>
                        <ul class="pagination-list">
                            <li>
                                <a class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a>
                            </li>
                            <li>
                                <a class="pagination-link" aria-label="Goto page 2">2</a>
                            </li>
                            <li>
                                <a class="pagination-link" aria-label="Goto page 3">3</a>
                            </li>
                        </ul>
                    </nav>
                    {this.formatPost()}
                </div>
            </TabPanel>

            <TabPanel>
                <div>
                    Manage Departments
                    {this.formatDept()}
                </div>
              
            </TabPanel>
            <TabPanel>
                <div>
                    Manage Posts
                    {this.formatResearch()}
                </div>
              
            </TabPanel>

            
          </Tabs>

        </div>
      </section>
    );
  }
}


