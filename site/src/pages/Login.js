import React from 'react';
import twitterLogo from '../assets/img/twitter.svg';
import './login.css';

class Login extends React.Component {
    state = {
        username: ''
    };

    submitHandler = e => {
        e.preventDefault();
        const { username } = this.state;

        if (!username.length) return;

        localStorage.setItem("@twitter:username", username);

        this.props.history.push('/timeline');
    }

    usernameHander = e => {
        this.setState({ username: e.target.value });
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="Tweitter logo" />
                <form onSubmit={this.submitHandler}>
                    <input
                        onChange={this.usernameHander}
                        value={this.state.username}
                        placeholder="Username"
                        required />
                    <button type="submit">Sign in</button>
                </form>
            </div>
        );
    }
}

export default Login;