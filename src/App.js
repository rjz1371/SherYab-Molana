import React, {Component} from 'react';
import {View} from 'react-native';
import {Header, Button, Spinner} from './components/common';
import SearchForm from './components/SearchForm';

class App extends Component {

    render() {
        return (
          <View>
              <Header headerText="شعریاب مولانا"/>
              <SearchForm/>
          </View>
        );
    }
}

export default App;