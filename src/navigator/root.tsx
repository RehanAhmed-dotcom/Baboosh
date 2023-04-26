import 'react-native-gesture-handler';
import React from 'react';
import {Text, View, Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HOME from '../screens/Home/HOME';
import {navigationRef} from '../config/NavigationService';
import PROFILE from '../screens/Profile/PROFILE';
import SOURCE from '../screens/Source/SOURCE';
import SignUp from '../screens/Profile/signUp';
import MainProfile from '../screens/Profile/mainProfile';
import Notification from '../screens/notification/notification';
import Order from '../screens/Order/Order';
import newPayment from '../screens/payment/newPayment';
import OrderDetails from '../screens/Order/OrderDetails';
import Payment from '../screens/payment/payment';
import CompletedOrders from '../screens/Order/CompletedOrders';
import ContactUs from '../screens/ContactUs/ContactUs';
import SubmitEmail from '../screens/ForgotPassword/submitEmail';
import EnterCode from '../screens/ForgotPassword/enterCode';
import NewPassword from '../screens/ForgotPassword/newPassword';
import Splash from '../screens/Profile/splash';
import Request from '../screens/Requests/Request';
import ReqDetails from '../screens/Requests/ReqDetails';
import UserDetails from '../screens/Profile/UserDetails';
import editScreen from '../screens/Profile/editScreen';
import pdf from '../screens/pdf';
import Terms from '../screens/Terms';
import Privacy from '../screens/Privacy';
import FAQ from '../screens/FAQ';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{style: {borderTopWidth: 1}}}>
      <Tab.Screen
        name="HOME"
        component={HOME}
        options={{
          tabBarLabel: ({focused}) => (
            <MyTab title={'HOME'} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="SOURCE"
        component={SOURCE}
        options={{
          tabBarLabel: ({focused}) => (
            <MyTab title={'SOURCE'} focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="MainProfile"
        component={MainProfile}
        options={{
          tabBarLabel: ({focused}) => (
            <MyTab title="PROFILE" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Root = () => {
  const {isLoggedIn} = useSelector(({USER}) => USER);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="MainProfile" component={MainProfile} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
            <Stack.Screen name="edit" component={editScreen} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="pdf" component={pdf} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="Privacy" component={Privacy} />
            <Stack.Screen name="newPayment" component={newPayment} />
            <Stack.Screen name="FAQ" component={FAQ} />
            <Stack.Screen name="CompletedOrders" component={CompletedOrders} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="Request" component={Request} />
            <Stack.Screen name="ReqDetails" component={ReqDetails} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="PROFILE" component={PROFILE} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="EnterCode" component={EnterCode} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
            <Stack.Screen name="SubmitEmail" component={SubmitEmail} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Root;

const MyTab = ({title, focused}) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    }}>
    <Text
      style={{
        color: 'black',
        paddingBottom: 17,
        // backgroundColor: 'red',
        fontFamily:
          Platform.OS === 'ios'
            ? 'helveticaneue-thin'
            : 'HelveticaNeue-Regular',
        fontSize: 14,
      }}>
      {title}
    </Text>
    <Text
      style={{
        position: 'absolute',
        bottom: 1,
        fontSize: 30,
        zIndex: 3,
        color: focused ? 'black' : 'white',
        fontWeight: 'bold',
      }}>
      .
    </Text>
  </View>
);
