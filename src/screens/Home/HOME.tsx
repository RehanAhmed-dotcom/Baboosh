import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import {useStripe} from '@stripe/stripe-react-native';
import SplashScreen from 'react-native-splash-screen';
import {picsApi} from '../../lib/api';
import {updateToken} from '../../lib/api';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import messaging from '@react-native-firebase/messaging';
import {logoutuser, notificationAlert} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HOME = ({navigation}) => {
  const {bottom, top} = useSafeAreaInsets();
  const [vis, setVis] = useState(false);
  const [pics, setPics] = useState([]);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const dispatch = useDispatch();
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);
  // console.log('users', notificationSymbol);
  const source = require('../../images/box.pdf');
  useEffect(() => {
    SplashScreen.hide();
    getToken();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      picsApi().then(res => {
        console.log('res1sdfkj', res);
        setPics(res.projectdata);
      });
    });
    return unsubscribe;
  }, [navigation]);
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    updateToken({Auth: user.userdata.api_token, fcm_token: fcmToken});
    messaging().onTokenRefresh(token => {
      updateToken({Auth: user.userdata.api_token, fcm_token: token});
    });
  };
  const USER = useSelector(({USER}) => USER);
  const {fcmtoken: fcm_token} = USER;
  console.log('fcm', fcm_token);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 0 : top,
      }}>
      <View
        style={{
          height: 56,
          backgroundColor: 'white',
          // borderBottomColor: '#ccc',
          // borderBottomWidth: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <View style={{width: 45}}></View>
        <View>
          <Text
            // onPress={() => }
            style={{
              // marginLeft: 20,
              fontFamily: 'Boiling-BlackDemo',
              fontSize: 20,
              // fontWeight: 'bold',
            }}>
            Baboosh
          </Text>
        </View>
        <View
          // onPress={() => navigation.navigate('Notification')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Icon
              name={'bell'}
              style={{marginRight: 10}}
              size={20}
              color="black"
              onPress={() => {
                notificationAlert(false)(dispatch);
                navigation.navigate('Notification');
              }}
            />
            {notificationSymbol ? (
              <Text
                style={{
                  bottom: 12,
                  right: 16,
                  fontWeight: 'bold',
                  color: 'red',
                }}>
                .
              </Text>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <Image
              resizeMode="contain"
              source={require('../../images/Question.png')}
              style={{height: 15, width: 15}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: '#ccc',
          // marginTop: 10,
          //   flexDirection: 'row',
          borderRadius: 1,
        }}></View>
      <ScrollView>
        <View style={{flex: 1, paddingHorizontal: 15}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('pdf');
            }}
            style={{
              // borderBottomWidth: 1,
              // borderBottomColor: '#ccc',
              paddingVertical: 20,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 22, fontFamily: 'Boiling-BlackDemo'}}>
              We've got new!
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 10,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Click here to view Baboosh book...full of pieces we have ready to
              ship from the Baboosh HQ
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: '#ccc',
              // marginTop: 10,
              //   flexDirection: 'row',
              borderRadius: 1,
            }}></View>
          <View style={{marginTop: hp(7)}}>
            <Text
              style={{
                fontSize: 12,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              OUR PICKS
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 22,
                fontFamily: 'Boiling-BlackDemo',
              }}>
              What's Hot
            </Text>
          </View>
          <View>
            {pics.map((item, index) => (
              <View style={{marginTop: 15}} key={index + 'a'}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.instagram.com/sourcebaboosh/')
                  }>
                  <Image
                    source={{uri: item.image}}
                    style={{height: hp(40), width: '100%'}}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={{height: 15}}></View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HOME;
