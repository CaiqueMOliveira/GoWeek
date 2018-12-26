import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

class Timeline extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Timeline
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default Timeline;