import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {notificationAlert} from '../../redux/actions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {notificationList} from '../../lib/api';
const Notification = ({navigation}) => {
  const [notification, setNotification] = useState([]);
  const {top, bottom} = useSafeAreaInsets();
  const [source, setSource] = useState([]);
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  // console.log(user?.userdata?.api_token);
  useEffect(() => {
    notificationList({Auth: user?.userdata?.api_token}).then(res => {
      // console.log('object', res);

      setNotification(res.data);
    });
  }, [navigation]);
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);

  console.log('user', notification);
  const dispatch = useDispatch();
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
          <Icon1 name="arrowleft" size={20} onPress={navigation.goBack} />
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
            {notificationSymbol && (
              <Text
                style={{
                  bottom: 12,
                  right: 16,
                  fontWeight: 'bold',
                  color: 'red',
                }}>
                .
              </Text>
            )}
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
            paddingBottom: 50,
          }}>
          Notifications:
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
      <ScrollView>
        <View
          style={{
            width: wp(100),
            marginTop: hp(2),
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          {notification.reverse().map((item, index) => (
            <View key={index + 'a'} style={{width: '100%'}}>
              <TouchableOpacity
                onPress={() => {
                  console.log('ree', item.source);
                  item.type == 'submitted_enquiry'
                    ? navigation.navigate('Order', {
                        id: item.order_id,
                        // orderId: item.source.varients[0].order_id,
                        image: item.source.order_image,
                        varients: item.source.varients,
                        paid: item.paid_status,
                      })
                    : item.type == 'order_confirmed'
                    ? navigation.navigate('OrderDetails', {
                        id: item.order_id,
                        image: item.source.image,
                        // brand: item.source.brand,
                        // item: item.source.item,
                        // info: item.source.info,
                        // size: item.source.size,
                        varients: item.source.varients,
                      })
                    : navigation.navigate('ReqDetails', {
                        image: item.source.image,
                        brand: item.source.brand,
                        item: item.source.item,
                        info: item.source.info,
                        size: item.source.size,
                      });
                }}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: 20,
                  // borderBottomColor: 'grey',
                  // borderBottomWidth: 1,
                  // borderStyle: 'dashed',
                  alignItems: 'center',
                  borderRadius: 1,
                  paddingHorizontal: 10,
                  //   backgroundColor: 'red',
                }}>
                <Text style={{fontFamily: 'Boiling-BlackDemo', fontSize: 20}}>
                  {index + 1}
                </Text>
                <Text style={{marginLeft: 7}}>.</Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'helveticaneue-thin'
                        : 'HelveticaNeue-Regular',
                    marginLeft: 10,
                  }}>
                  {item.message}
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
          ))}
          {/*           
        
        <View style={{width: '100%'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingVertical: 20,
              // borderBottomColor: 'grey',
              // borderBottomWidth: 1,
              // borderStyle: 'dashed',
              alignItems: 'center',
              borderRadius: 1,
              paddingHorizontal: 10,
              //   backgroundColor: 'red',
            }}>
            <Text style={{fontFamily: 'Boiling-BlackDemo', fontSize: 20}}>
              2
            </Text>
            <Text style={{marginLeft: 7}}>.</Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'HelveticaNeue-Regular',
                marginLeft: 10,
              }}>
              We have received your enquiry
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
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingVertical: 20,
              // borderBottomColor: 'grey',
              // borderBottomWidth: 1,
              // borderStyle: 'dashed',
              alignItems: 'center',
              borderRadius: 1,
              paddingHorizontal: 10,
              //   backgroundColor: 'red',
            }}>
            <Text style={{fontFamily: 'Boiling-BlackDemo', fontSize: 20}}>
              3
            </Text>
            <Text style={{marginLeft: 7}}>.</Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'HelveticaNeue-Regular',
                marginLeft: 10,
              }}>
              We have sourced your item
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
            onPress={() => navigation.navigate('Order')}
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingVertical: 20,
              //   borderBottomColor: 'grey',
              //   borderBottomWidth: 1,
              //   borderStyle: 'dashed',
              alignItems: 'center',
              borderRadius: 1,
              paddingHorizontal: 10,
              //   backgroundColor: 'red',
            }}>
            <Text style={{fontFamily: 'Boiling-BlackDemo', fontSize: 20}}>
              4
            </Text>
            <Text style={{marginLeft: 7}}>.</Text>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'HelveticaNeue-Regular',
                  marginLeft: 10,
                }}>
                Please click here to check & confirm
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'HelveticaNeue-Regular',
                  marginLeft: 10,
                }}>
                your order (order will be held for 12 hours)
              </Text>
            </View>
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
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingVertical: 20,
              //   borderBottomColor: 'grey',
              //   borderBottomWidth: 1,
              //   borderStyle: 'dashed',
              alignItems: 'center',
              borderRadius: 1,
              paddingHorizontal: 10,
              //   backgroundColor: 'red',
            }}>
            <Text style={{fontFamily: 'Boiling-BlackDemo', fontSize: 20}}>
              5
            </Text>
            <Text style={{marginLeft: 7}}>.</Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'HelveticaNeue-Regular',
                marginLeft: 10,
              }}>
              Your order has been confirmed!
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
 */}
        </View>
      </ScrollView>
    </View>
  );
};
export default Notification;
