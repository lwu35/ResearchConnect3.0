import React, { PureComponent } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import profileImg from '../assets/profile.png';

class ForumPostCard extends PureComponent {




    render() {
        const { user } = this.props;
        var date = new Date(user.created);

        var formatDate = date.toLocaleDateString();
        var formatTime = date.toLocaleTimeString();

        return (
            <article class="post">
                <div className="box">
                    <h4>{user.title}</h4>

                    <Link className="has-text-success" to={`/forum/${user.id}`}>
                        Read More...
                    </Link>
                    <div class="media">
                        <div class="media-left">
                            <p class="image is-32x32">
                                <img src="http://bulma.io/images/placeholders/128x128.png"></img>

                            </p>
                        </div>

                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <a>{user.cruzid}</a> posted on {formatDate} {formatTime} &nbsp;
						</p>
                            </div>
                        </div>

                        <div class="media-right">

                            <span class="tag">
                                {user.tag}
                            </span>
                            <span class="has-text-grey-light"><i class="fa fa-comments"></i> {user.replies.length} </span>
                        </div>
                    </div>
                </div>
                
            </article>





        );
    }
}

export default withRouter(ForumPostCard);
