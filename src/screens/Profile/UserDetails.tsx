import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  Platform,
} from 'react-native';
// import {logoutuser} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {logoutuser, notificationAlert} from '../../redux/actions';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const UserDetails = ({navigation}) => {
  // const dispatch = useDispatch();
  const {top, bottom} = useSafeAreaInsets();
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  const dispatch = useDispatch();
  // console.log('object', user.userdata);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'ios' ? top : 0,
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
        <View style={{width: 40}}>
          <Icon1
            name="arrowleft"
            size={20}
            onPress={() => navigation.goBack()}
          />
        </View>
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
          // marginHorizontal: 15,
          //   flexDirection: 'row',
          borderRadius: 1,
        }}></View>
      <ScrollView>
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
            My details:
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
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              width: wp(100),
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 50,
              justifyContent: 'space-between',
            }}>
            <View style={{width: 50}}></View>
            {user.userdata.image ? (
              <Image
                source={{uri: user.userdata.image}}
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

            <TouchableOpacity
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('edit')}>
              <Icon1 name="edit" size={20} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              // backgroundColor: 'red',
              marginTop: 50,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 20,
                borderRadius: 1,
                // backgroundColor: 'red',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                Name
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginRight: 15,
                }}>
                {user.userdata.name}
              </Text>
            </View>
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
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 1,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                Email
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginRight: 15,
                }}>
                {user.userdata.email}
              </Text>
            </View>
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
            <View
              //   onPress={() => navigation.navigate('CompletedOrders')}
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                justifyContent: 'space-between',
                // backgroundColor: 'red',
                // flexWrap: 'wrap',
                alignItems: 'center',
                borderRadius: 1,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                Shipping Address
              </Text>
              <View
                style={{
                  width: '60%',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <Text
                  ellipsizeMode={'tail'}
                  //numberOfLines={2}
                  style={{
                    // width: '60%',
                    fontSize: 14,

                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'helveticaneue-thin'
                        : 'HelveticaNeue-Regular',
                    marginRight: 15,
                  }}>
                  {user.userdata.shipping_address}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 1,
              }}></View>
          </View>
          <View style={{width: '100%'}}>
            <View
              //   onPress={() => navigation.navigate('CompletedOrders')}
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                justifyContent: 'space-between',
                // backgroundColor: 'red',
                // flexWrap: 'wrap',
                alignItems: 'center',
                borderRadius: 1,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                Telephone no
              </Text>
              <View
                style={{
                  width: '60%',
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <Text
                  ellipsizeMode={'tail'}
                  //numberOfLines={2}
                  style={{
                    // width: '60%',
                    fontSize: 14,

                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'helveticaneue-thin'
                        : 'HelveticaNeue-Regular',
                    marginRight: 15,
                  }}>
                  {user.userdata.telephone_no}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 1,
              }}></View>
          </View>

          <View style={{width: '100%'}}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 1,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginLeft: 15,
                }}>
                Password
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS === 'ios'
                      ? 'helveticaneue-thin'
                      : 'HelveticaNeue-Regular',
                  marginRight: 15,
                }}>
                ********
              </Text>
            </View>
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
export default UserDetails;
