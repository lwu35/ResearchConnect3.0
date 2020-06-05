import React, { Component } from 'react';
import AddForumPost from './AddForumPost';


class NewForumPost extends Component {
    onSubmit = () => {
        this.props.history.push('/forum');
    };

    render() {
        return (
          <div className="section container">
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
                <h1 className="title has-text-centered">NEW FORUM POST</h1>
                <AddForumPost onSubmit={this.onSubmit} />
              </div>
            </div>
          </div>
);
    }
}

export default NewForumPost;