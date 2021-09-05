import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home.Screen';
import ProfileScreen from '../screens/Profile.Screen';
import EditProfileScreen from '../screens/EditProfile.Screen'


const Stack = createStackNavigator();


export default class AppNavigator extends React.Component {
  
  state = {
    name: null
  }

  render() {

    return (
  
      <Stack.Navigator>

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />

      </Stack.Navigator>


    )
  }
}