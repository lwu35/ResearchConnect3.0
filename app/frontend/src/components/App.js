import React, { Component } from 'react';
import {
  Route, Switch, NavLink, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar';
import Landing from './Landing';
import Home from './Home';
import Profile from './Profile';
import ResearchPost from './ResearchPost';
import Spinner from './Spinner';
import EditProfile from './EditProfile';
import SearchResults from './SearchResults';
import Applicants from './Applicants';
import * as actions from '../actions';
import ErrorBoundary from './ErrorBoundary';
import Setup from './Setup';
import NewResearch from './NewResearch';
import PageNotFound from './ErrorPage';

import DisplayProfessor from './DisplayProfessor';
import ProTip from './ProTip';
import ProfessorInfo from './ProfessorInfo';
import Admin from './Admin';
import StudentForum from './StudentForum';
import NewForum from './NewForumPost';
import ForumPostInfo from './ForumPostInfo'

NavLink.defaultProps.activeClassName = 'is-active';

const PrivateRoute = ({
  loggedIn, accountSetup, component, ...rest
}) => (
    <Route
      {...rest}
      component={loggedIn ? (accountSetup ? component : Setup) : Landing}
    />
  );

class App extends Component {
  componentDidMount() {
    this.props.fetchUser().then((_) => {
      this.props.fetchProfile(this.props.auth.cruzid);
    });
  }

  render() {
    return this.props.loadState === 0 ? (
      <>
        <NavBar />
        <ErrorBoundary>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Home}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <PrivateRoute
              exact
              path="/profile/:cruzid"
              component={Profile}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <PrivateRoute
              exact
              path="/settings"
              component={EditProfile}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <PrivateRoute
              exact
              path="/new"
              component={NewResearch}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
             <PrivateRoute
              exact
              path="/new/forum"
              component={NewForum}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            {/* added to test the professor display*/}
            <PrivateRoute
              exact
              path="/professor/all"
              component={DisplayProfessor}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <PrivateRoute
              exact
              path="/pro_tip"
              component={ProTip}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <PrivateRoute
              exact
              path="/forum"
              component={StudentForum}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <PrivateRoute
              exact
              path="/forum/:id"
              component={ForumPostInfo}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <PrivateRoute
              exact
              path="/admin"
              component={Admin}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <PrivateRoute
              exact
              path="/info/:cruzid"
              component={ProfessorInfo}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            {/* <Route exact path="/studentForm" component={studentForm} /> */}
            <PrivateRoute
              exact
              path="/search_results"
              component={SearchResults}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <Route
              exact
              path="/post"
              component={ResearchPost}
            />
            <Route
              path="/post/:id"
              component={ResearchPost}
            />
            <PrivateRoute
              exact
              path="/applicants"
              component={Applicants}
              loggedIn={this.props.auth}
              accountSetup={this.props.auth.isSetup}
            />
            <Route component={PageNotFound} />
            {this.props.auth ? <></> : <Redirect from="/*" to="/" />}
          </Switch>
        </ErrorBoundary>
        <Route
          render={({ history }) => {
            // Auto-update service worker on route change
            history.listen(() => {
              if (window.swUpdate === true) {
                // console.log('Reloading');
                window.location.reload();
              }
            });
            return null;
          }}
        />
      </>
    ) : (this.props.loadState === 1) ? (
      <Spinner fullPage />
    ) : (
          <>
            <NavBar />
            <Spinner fullPage />
          </>
        );
  }
}

function mapStateToProps({ auth, profile, loadState }) {
  return { auth, profile, loadState };
}

export default connect(
  mapStateToProps,
  actions,
)(App);
