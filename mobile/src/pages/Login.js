import React, { Component } from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

class Login extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        username: ''
    };

    async componentDidMount() {
        const username = await AsyncStorage.getItem('@GoTwitter:username');
        if (username) this.navigateToTimeline();
    }

    usernameHandler = username => {
        this.setState({ username });
    }

    handlerLogin = async () => {
        const { username } = this.state;

        if (!username.length) return;

        await AsyncStorage.setItem('@GoTwitter:username', username);

        this.navigateToTimeline();
    }

    navigateToTimeline = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Timeline' })]
        });

        this.props.navigation.dispatch(resetAction);
    }

    render() {
        const { username } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="height">
                <View style={styles.content}>
                    <View>
                        <Icon name="twitter" size={64} color="#4BB0EE" />
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        onChangeText={this.usernameHandler}
                        value={username}
                        returnKeyType="send"
                        onSubmitEditing={this.handlerLogin}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handlerLogin}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 15,
        alignSelf: 'stretch',
        marginTop: 30
    },
    button: {
        height: 44,
        alignSelf: 'stretch',
        marginTop: 10,
        backgroundColor: '#4BB0EE',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30
    }
});

export default Login;