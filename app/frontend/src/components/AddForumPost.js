import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class AddForumPost extends React.Component {
    state = {
        text: '',
        title: '',
        author: this.props.auth.cruzid,
        valid: false,
        tag: 'General',

    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    validate() {
        const { text } = this.state;
        const { title } = this.state;
        if (/\S/.test(text) && /\S/.test(title)) {

            this.setState({
                valid: true
            });
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        await this.validate();
        if (this.state.valid === true) {
            await axios.post('/api/forum_post/new', { ...this.state });
            this.setState({
                text: '',
                title: '',
                author: this.props.auth.cruzid,
                cruzid: this.props.auth.cruzid,
                valid: false,
                tag: '',

            })

            this.props.onSubmit()
        } else alert('Missing fields.');
    }

    onCancel = (e) => {
        e.preventDefault();
        this.setState({
            text: '',
            title: '',
            author: this.props.auth.cruzid,
            cruzid: this.props.auth.cruzid,
            valid: false,

        });

        this.props.onSubmit();
    };


    render() {
        
        return (
            <form>
                <div className="field" align="left">
                    <label className="label">Title</label>
                    <div className="control">
                        <input name="title" className="input" type="text" maxLength="50" placeholder="Title, 50 char limit" value={this.state.title} onChange={e => this.change(e)} />
                    </div>
                </div>
                <label className="label">Tag</label>
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <div class="select is-fullwidth">
                            <select name="tag" value={this.state.tag} onChange={e => this.change(e)}>
                                <option value="General">General</option>
                                <option value="Undergrad">Undergrad</option>
                                <option value="Graduate">Graduate</option>
                                <option value="Experience">Experience</option>
                                <option value="Other">Other</option> 
                            </select>
                        </div>
                    </div>
                </div>

                <div className="field" align="left">
                    <label className="label">Body</label>
                    <div className="control">
                        <textarea name="text" className="textarea" placeholder="Enter text here..." value={this.state.text} onChange={e => this.change(e)} />
                    </div>
                </div>


                <div className="columns" align="center">
                    <div className="column">
                        <button type="button" onClick={e => this.onCancel(e)} className="button is-danger is-outlined is-fullwidth">Cancel</button>
                    </div>
                    <div className="column">
                        <button type="button" onClick={e => this.onSubmit(e)} className="button is-fullwidth is-link">Submit</button>
                    </div>
                </div>
            </form>
        );
    }
}

function mapStateToProps({ auth, post }) {
    return { auth, post };
}

export default withRouter(connect(mapStateToProps, actions)(AddForumPost));
