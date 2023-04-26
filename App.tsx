import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import Root from './src/navigator/root';
import {Store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {fcm} from './src/redux/actions';
import {requestUserPermissionForMessaging} from './src/lib/utils';
import {updateToken} from './src/lib/api';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
const App = () => {
  useEffect(() => {
    getToken();
    getNotifications();
    Platform.OS === 'android' && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      Platform.OS === 'ios' &&
        PushNotificationIOS.addNotificationRequest({
          id: new Date().toString(),
          title: remoteMessage.notification?.title,
          body: remoteMessage.notification?.body,
          category: 'userAction',
          userInfo: remoteMessage.data,
        });
    });
    return unsubscribe;
  }, []);

  const getToken = async () => {
    // const {USER} = Store.getState();
    requestUserPermissionForMessaging().then(async res => {
      let fcmToken = await messaging().getToken();

      // Store.dispatch(fcm(fcmToken));
      if (fcmToken) {
        try {
          Store.dispatch(fcm(fcmToken));
        } catch (e) {}
        // await AsyncStorage.setItem('fcmToken', fcmToken);
      }
      // if (res) {
      //   console.log('heer is res', res);
      //   let fcmToken = await Store.dispatch(fcm(fcmToken));
      //   if (!fcmToken) {
      //     fcmToken = await messaging().getToken();
      //     if (fcmToken) {
      //       await Store.dispatch(fcm(fcmToken));
      //     }
      //   }
      // }
    });
    // messaging().onTokenRefresh(token => {
    //   const {USER} = Store.getState();
    //   console.log('object', USER.userData.userdata.api_token);
    //   updateToken({Auth: USER.userData.userdata.api_token, fcm_token: token});
    //   // updateToken({fcm_token: token, Auth: USER.userData.userdata.api_token});
    //   console.log('onTokenRefresh', token);
    //   console.log('user', USER.userData.userdata.api_token);
    // });
  };
  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'fcm_fallback_notification_channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      // created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };
  const getNotifications = async () => {
    await messaging().onNotificationOpenedApp(remoteMessage => {});
    await messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
        }
      });
  };
  return (
    <StripeProvider
      // publishableKey="pk_test_51IdudfCvAFj9FKm2BjB9BBL8Os9tP9oShx9SWEZKChOsVUJj2tmoW4suTr1FK8TcqV8g6vzeNo8BPAxC1PGy3Ip1003XooWJb9"
      publishableKey="pk_live_51JaGQKLftj9Egum49jLefHwqABwcEvhtdVfFBLJchCvIRIuo9h91mmGPk2DRrCUk77LQzasuPdwtEmBfJUDDdVC400fxdu4ukK"
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

export default App;
