import React, {Component} from 'react';
import {Button, Card, CardSection, Input, Spinner} from './common';
import axios from 'axios';
import {Text, View} from "react-native";

class SearchForm extends Component {

    state = {search: '', loading: true, error: '', poem: []};

    componentWillMount() {
        this.getPoemFromServer();
    }

    getPoemFromServer() {
        let search = this.state.search;
        this.setState({error: ''});
        this.setState({loading: true});
        axios.get(`https://padpro.ir/api/sheryab-molana/?search=${search}`)
            .catch(() => {
                this.setState({loading: false});
                this.setState({error: 'عدم ارتباط با سرور'})
            })
            .then((response) => {
                this.setState({loading: false});
                this.setState({poem: response.data});
            });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small"/>
        }
        return (
            <Button onPress={this.getPoemFromServer.bind(this)} text="بگرد"/>
        )
    }

    renderPoem() {
        let poem = this.state.poem;
        if (poem.length === 0) return;
        let m1 = this.state.poem[0];
        let m2 = this.state.poem[1];
        let poems = [];
        for (let i = 0; i < m1.length; i++) {
            poems.push(
                <Text key={i} style={styles.poemText}>
                    {m1[i]} / {m2[i]}
                </Text>
            );
        }
        return poems;
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        secureTextEntry={false}
                        placeholder="کلمه مورد نظر را بنویسید"
                        label="کلمه"
                        value={this.state.search}
                        onChangeText={(text) => this.setState({search: text})}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>

                <View style={styles.poemView}>
                    {this.renderPoem()}
                </View>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    poemText: {
        paddingTop: 10,
        paddingRight: 8,
        paddingLeft: 8,
        textAlign: 'right',
        fontSize: 16,
        color: '#2f4f4f'
    },
    poemView: {
        paddingBottom: 80
    }
};

export default SearchForm;