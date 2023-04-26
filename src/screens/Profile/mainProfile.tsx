import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
// import {logoutuser} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {logoutuser, notificationAlert} from '../../redux/actions';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {update} from '../../redux/actions';
import {edit} from '../../lib/api';
import ImagePicker from 'react-native-image-crop-picker';

const MainProfile = ({navigation}) => {
  const {bottom, top} = useSafeAreaInsets();

  // const dispatch = useDispatch();
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  const [pic, setPic] = useState('');
  const dispatch = useDispatch();
  // console.log('object', user.userdata);
  const choosePic = () => {
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      cropping: true,
    }).then(image => {
      setPic(image);
      const data1 = new FormData();
      data1.append('image', {
        uri: image.path,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
      edit({Auth: user?.userdata.api_token}, data1).then(res => {
        console.log('res', res);
        if (res) {
          update(res)(dispatch);
        } else {
          Alert.alert('Something went wrong');
        }
      });
    });
  };
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
          //   elevation: 3,
          // borderBottomColor: '#ccc',
          // borderBottomWidth: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <View style={{width: 35}}></View>
        <View>
          <Text
            style={{
              // marginLeft: 20,
              fontFamily: 'Boiling-BlackDemo',
              fontSize: 20,
              //   fontWeight: 'bold',
            }}>
            Baboosh
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
      <ScrollView
        contentContainerStyle={{
          paddingBottom: Platform.OS === 'android' ? 0 : bottom,
        }}>
        <View
          style={{
            marginHorizontal: 15,
            paddingVertical: 30,
            // borderBottomWidth: 1,
            // borderBottomColor: '#ccc',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'Boiling-BlackDemo',
              paddingBottom: 30,
            }}>
            My profile:
          </Text>
        </View>
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: '#ccc',
            // marginTop: 10,
            marginHorizontal: 15,
            //   flexDirection: 'row',
            borderRadius: 1,
          }}></View>
        <View
          style={{
            width: wp(100),
            marginTop: hp(5),
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={choosePic}>
            {user.userdata.image ? (
              <Image
                source={{uri: user.userdata.image}}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                }}
              />
            ) : pic ? (
              <Image
                source={{uri: pic.path}}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: 'black',
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon1 name={'user'} color="white" size={40} />
              </View>
            )}
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 20,
              fontSize: 16,
              fontFamily:
                Platform.OS === 'ios'
                  ? 'helveticaneue-thin'
                  : 'HelveticaNeue-Regular',
            }}>
            Welcome back {user.userdata.name}
          </Text>
          <View style={{width: '100%', marginTop: 50}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Request')}
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                //   borderBottomColor: 'grey',
                //   borderBottomWidth: 1,
                //   borderStyle: 'dashed',
                alignItems: 'center',
                borderRadius: 1,
                //   backgroundColor: 'red',
              }}>
              <View
                style={{
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 25,
                }}>
                <Image
                  source={require('../../images/request.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                My Requests
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                //   flexDirection: 'row',
                borderRadius: 1,
              }}></View>
          </View>
          <View style={{width: '100%'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CompletedOrders')}
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                //   borderBottomColor: 'grey',
                //   borderBottomWidth: 1,
                //   borderStyle: 'dashed',
                alignItems: 'center',
                borderRadius: 1,
                //   backgroundColor: 'red',
              }}>
              <View
                style={{
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 25,
                }}>
                <Icon2 name="ios-basket-outline" size={20} color="white" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                My orders
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                //   flexDirection: 'row',
                borderRadius: 1,
              }}></View>
          </View>
          <View style={{width: '100%'}}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.dhl.com/en/express/tracking.html')
              }
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                //   borderBottomColor: 'grey',
                //   borderBottomWidth: 1,
                //   borderStyle: 'dashed',
                alignItems: 'center',
                borderRadius: 1,
                //   backgroundColor: 'red',
              }}>
              <View
                style={{
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 25,
                }}>
                <Icon3 name="package-variant" size={20} color="white" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                Track your package
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                //   flexDirection: 'row',
                borderRadius: 1,
              }}></View>
          </View>

          <View style={{width: '100%'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ContactUs')}
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                //   borderBottomColor: 'grey',
                //   borderBottomWidth: 1,
                //   borderStyle: 'dashed',
                alignItems: 'center',
                borderRadius: 1,
                //   backgroundColor: 'red',
              }}>
              <View
                style={{
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 25,
                }}>
                <Icon1 name="wechat" size={20} color="white" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                Contact us
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                //   flexDirection: 'row',
                borderRadius: 1,
              }}></View>
          </View>
          <View style={{width: '100%'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserDetails')}
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                //   borderBottomColor: 'grey',
                //   borderBottomWidth: 1,
                //   borderStyle: 'dashed',
                alignItems: 'center',
                borderRadius: 1,
                //   backgroundColor: 'red',
              }}>
              <View
                style={{
                  backgroundColor: '#000000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 25,
                }}>
                <Icon3 name="account" size={20} color="white" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                My details
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                //   flexDirection: 'row',
                borderRadius: 1,
              }}></View>
          </View>

          <View style={{width: '100%'}}>
            <TouchableOpacity
              onPress={() => logoutuser(false)(dispatch)}
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                //   borderBottomColor: 'grey',
                //   borderBottomWidth: 1,
                //   borderStyle: 'dashed',
                alignItems: 'center',
                borderRadius: 1,
                //   backgroundColor: 'red',
              }}>
              <View
                style={{
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                  borderRadius: 25,
                }}>
                <Icon1 name="logout" size={20} color="white" />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                Logout
              </Text>
            </TouchableOpacity>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                //   flexDirection: 'row',
                borderRadius: 1,
              }}></View>
          </View>
        </View>
        <View style={{height: hp(2)}}></View>
      </ScrollView>
    </View>
  );
};
export default MainProfile;
