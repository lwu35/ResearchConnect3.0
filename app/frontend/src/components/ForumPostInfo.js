import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import profileImg from '../assets/profile.png';
import Spinner from './Spinner';

class ForumPostInfo extends Component {



    constructor(props) {
        super(props);

        this.state = {
            post: null,
            loading: true,

        };

        this.setForumStates();
    }

    componentDidMount() {
        this.setForumStates();
    }

    setForumStates() {
        // Fetch and set user specific data to local states
        var test = '/api/forum_post/' + this.props.match.params.id;


        axios
            .get(test)
            .then(response => this.setState({
                post: response.data,
                loading: false,

            }))
            .catch(error => console.log(error));

    }



    render() {

        if (this.state.loading) {
            return <Spinner fullPage />;
        }
        var date = new Date(this.state.post.created);

        var formatDate = date.toLocaleDateString();
        var formatTime = date.toLocaleTimeString();


        return (
            <section class="container">
                <br></br>
                <br></br>
                <div class="columns">
                    <div class="column is-2">
                        <a class="button is-primary is-block is-alt is-medium" href="/forum">Back</a>
                    </div>

                    <div class="column is-9">
                        <div className="box">
                            <div className="column is-three-quarter">
                                <h2 className="title is-4 is-uppercase has-text-primary	">{this.state.post.title}</h2>
                            </div>

                            <hr></hr>
                            <div className="box">
                                <div className="column">
                                    <h1 className="subtitle is-size-6" >{this.state.post.text}</h1>
                                </div>
                            </div>

                            <h1 className="subtitle is-size-7" align="right">Posted by: {this.state.post.cruzid} on {formatDate} {formatTime}</h1>


                        </div>

                    </div>

                </div>


            </section>
        );
    }
}



export default withRouter(ForumPostInfo);

