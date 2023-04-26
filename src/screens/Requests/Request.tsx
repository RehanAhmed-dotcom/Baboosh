import React, {useState, useEffect} from 'react';
import {View, Text, Platform, TouchableOpacity, Image} from 'react-native';
import {requestList} from '../../lib/api';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {logoutuser, notificationAlert} from '../../redux/actions';
import {ScrollView} from 'react-native-gesture-handler';
const Request = ({navigation}) => {
  const {top, bottom} = useSafeAreaInsets();
  const initial = 0;
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const {user, notificationSymbol} = useSelector(({USER, NOTIFICATION}) => ({
    notificationSymbol: NOTIFICATION.notificationSymbol,
    user: USER.userData,
  }));
  useEffect(() => {
    requestList({Auth: user.userdata.api_token}).then(res => {
      setRequests(res.projectdata);
    });
  }, []);
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
        <View style={{width: 35}}>
          <Icon name="arrowleft" size={20} onPress={navigation.goBack} />
        </View>
        <View>
          <Text
            style={{
              // marginLeft: 20,
              fontFamily: 'Boiling-BlackDemo',
              fontSize: 18,
              //   fontWeight: 'bold',
            }}>
            Baboosh
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{flexDirection: 'row'}}>
            <Icon1
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
          My Requests
        </Text>
      </View>
      <View
        style={{
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: '#ccc',
          marginHorizontal: 15,
          //   flexDirection: 'row',
          borderRadius: 1,
        }}></View>
      <View style={{flex: 1}}>
        <ScrollView>
          {requests.map((item, index) => (
            <>
              <View
                key={index + 'a'}
                style={{
                  // borderBottomColor: '#ccc',
                  // borderBottomWidth: 1,
                  padding: 15,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ReqDetails', {
                      image: item.image,
                      brand: item.brand,
                      item: item.item,
                      info: item.info,
                      size: item.size,
                    })
                  }
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 50, height: 50, borderRadius: 25}}
                  />
                  <View
                    style={{
                      marginLeft: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily:
                          Platform.OS === 'ios'
                            ? 'helveticaneue-thin'
                            : 'HelveticaNeue-Regular',
                      }}>
                      {item.brand}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        marginLeft: 10,
                        fontFamily:
                          Platform.OS === 'ios'
                            ? 'helveticaneue-thin'
                            : 'HelveticaNeue-Regular',
                      }}>
                      {item.item}
                    </Text>
                  </View>
                </TouchableOpacity>
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
            </>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
export default Request;
