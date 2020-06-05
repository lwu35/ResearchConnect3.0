import React, { Component } from 'react';
import axios from 'axios';
import ForumPostCard from './ForumPostCard';

export default class StudentForum extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allPosts: [],
			posts: [],
			loading: true,
		};
	}

	componentDidMount() {
		this.setState({ loading: true });
		this.getPosts();
	}


	getPosts() {
		const { posts, loading } = this.state;
		this.setState({
			allPosts: posts,
			posts,
			loading: true,
		});

		axios.get('/api/forum_post/list')
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

	handleFilterChange = (event) => {
		const { allPosts } = this.state;
		
		if (!event.target.id) {
			return this.setState(prevState => ({
				posts: prevState.allPosts,
			}));
		}
		if (event.target.id == "All") {
			return this.setState(prevState => ({
				posts: prevState.allPosts,
			}));
		}

		const filteredPosts = allPosts.filter((post) => {
			return (
				post.tag.includes(event.target.id) ||
				false
			)
		});
		console.log("check posts", filteredPosts);
		return this.setState({
			posts: filteredPosts,
		});
	}


	formatPost() {
		const { posts } = this.state;

		return (
			<React.Fragment>
				{posts.reverse().map(post => (
					<ForumPostCard
						key={post._id}
						user={{
							id: post._id,
							text: post.text,
							title: post.title,
							cruzid: post.cruzid,
							created: post.created,
							replies: post.replies,
							author: post.author,
							tag: post.tag,
						}}
					/>
				))}
			</React.Fragment>
		);
	}


	render() {

		return (

			<section class="container">
				<br></br>
				<br></br>
				<div class="columns">
					<div class="column is-3">
						<a class="button is-primary is-block is-alt is-medium" href="/new/forum">New Post</a>
						<br></br>
						<div class="box content">
							<h2 className="title is-5 is-uppercase has-text-primary	">Tags:</h2>

							<div>
								<button class="button" id={"All"} onClick={e => this.handleFilterChange(e)}>All</button>
							</div>
							<div>
								<button class="button" id={"General"} onClick={e => this.handleFilterChange(e)}>General</button>
							</div>
							<div>
								<button class="button" id={"Undergrad"} onClick={e => this.handleFilterChange(e)}>Undergrad</button>
							</div>
							<div>
								<button class="button" id={"Graduate"} onClick={e => this.handleFilterChange(e)}>Graduate</button>
							</div>
							<div>
								<button class="button" id={"Experience"} onClick={e => this.handleFilterChange(e)}>Experience</button>
							</div>
							<div>
								<button class="button" id={"Other"} onClick={e => this.handleFilterChange(e)}>Other</button>
							</div>


						</div>
					</div>

					<div class="column is-9">
						<div class="box content">

							{this.formatPost()}

						</div>
					</div>

				</div>
			</section>




		);
	}
}





