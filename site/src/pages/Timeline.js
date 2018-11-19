import React from 'react';
import twitterLogo from '../assets/img/twitter.svg'
import './timeline.css'
import api from '../services/api'
import Tweet from '../components/Tweet';
import socket from 'socket.io-client';

class Timeline extends React.Component {

    state = {
        tweets: [],
        newTweet: ''
    };

    async componentDidMount() {
        this.subscribeToEvents();
        const response = await api.get('tweets');
        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3000');

        io.on('tweet', tweetData => {
            this.setState({
                tweets: [tweetData, ...this.state.tweets]
            });
        })

        io.on('likes', likeData => {
            this.setState({
                tweets: this.state.tweets.map(currentTweet =>
                    currentTweet._id === likeData._id ? likeData : currentTweet
                )
            })
        });
    }

    newTweetHandler = e => {
        this.setState({ newTweet: e.target.value });
    }

    createNewTweetHandler = async e => {
        if (e.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@twitter:username');

        await api.post('tweets', { author, content });

        this.setState({ newTweet: '' });
    }

    render() {
        return (
            <div className="timeline-wrapper">
                <img height={54} src={twitterLogo} alt="Twitter logo" />
                <form>
                    <textarea
                        onKeyDown={this.createNewTweetHandler}
                        onChange={this.newTweetHandler}
                        value={this.state.newTweet}
                        placeholder="What's happening?">
                    </textarea>
                </form>

                <ul className="tweet-list">
                    {this.state.tweets.map(currentTweet =>
                        <Tweet
                            key={currentTweet._id}
                            tweet={currentTweet} />)}
                </ul>
            </div>
        );
    }
}

export default Timeline;