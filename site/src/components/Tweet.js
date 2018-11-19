import React, { Component } from 'react';
import likeButton from '../assets/img/like.svg';
import api from '../services/api';


export default class Tweet extends Component {

    likeHandler = async () => {
        const { _id } = this.props.tweet;

        await api.post(`likes/${_id}`);
    };

    render() {
        const { tweet } = this.props;

        return (
            <li>
                <strong>{tweet.author}</strong>
                <p>{tweet.content}</p>
                <button type="button" onClick={this.likeHandler}>
                    <img src={likeButton} alt="Like" />
                    {tweet.likes}
                </button>
            </li>
        );
    }
}
