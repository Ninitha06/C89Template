import * as React from 'react';

import StackNavigator from './StackNavigator';
import Profile from '../screens/Profile';
import Logout from '../screens/Logout';

import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomSideBarMenu from './CustomSideBarMenu';

import firebase from 'firebase';
import db from '../config';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lightTheme: true,
    };
  }

  fetchTheme = async () => {
    let theme;
    await db
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        theme = data.val().current_theme;
        this.setState({
          lightTheme: theme === 'light' ? true : false,
        });
      });
  };

  componentDidMount() {
    this.fetchTheme();
  }

  render() {
    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false}}>
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    );
  }
}
