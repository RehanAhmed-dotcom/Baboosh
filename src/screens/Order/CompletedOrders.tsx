import React, {useState, useEffect} from 'react';
import {Text, View, Platform, Image, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useDispatch, useSelector} from 'react-redux';
import {logoutuser, notificationAlert} from '../../redux/actions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {orderList} from '../../lib/api';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
const CompletedOrders = ({navigation}) => {
  const {top, bottom} = useSafeAreaInsets();

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState('');
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  console.log(JSON.stringify(orders));
  const dispatch = useDispatch();
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);

  // console.log(user.userdata.api_token);
  const initial = 0;
  useEffect(() => {
    console.log('icalled');
    orderList({Auth: user.userdata.api_token}).then(res => {
      console.log('or', res);
      setOrders(res.projectdata);
    });
  }, []);
  console.log('price', orders);
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
              // fontWeight: 'bold',
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
          My Orders
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
      <View style={{width: '100%', marginTop: hp(2)}}>
        {orders.map((item, index) => (
          <View key={index + 'a'}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('OrderDetails', {
                  id: item.id,
                  image: item.image,
                  price: item.price,
                  varients: item.varients,
                  title: item.title,
                })
              }
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 20,
                justifyContent: 'space-between',
                // borderBottomColor: 'grey',
                // borderBottomWidth: 1,
                // backgroundColor: 'red',
                // borderStyle: 'dashed',
                alignItems: 'center',
                borderRadius: 1,
                paddingHorizontal: 10,
                //   backgroundColor: 'red',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Boiling-BlackDemo', fontSize: 20}}>
                  {index + 1}
                </Text>
                <Text style={{marginLeft: 7}}>.</Text>
                {/* <View style={{backgroundColor: 'red', width: '90%'}}> */}
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'helveticaneue-thin',
                    marginLeft: 10,
                  }}>
                  {item.sourcename}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  !item.paid && !item.delivery
                    ? navigation.navigate('Order', {
                        id: item.id,
                        image: item.image,
                        varients: item.varients,
                        paid: item.paid,
                      })
                    : navigation.navigate('OrderDetails', {
                        id: item.id,
                        image: item.image,
                        price: item.price,
                        varients: item.varients,
                        title: item.title,
                      });
                }}
                style={{
                  marginRight: 20,
                  height: 30,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  // width: 100,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontFamily:
                      Platform.OS === 'ios'
                        ? 'helveticaneue-thin'
                        : 'HelveticaNeue-Regular',
                  }}>
                  {!item.paid && !item.delivery
                    ? 'Pay now'
                    : !item.delivery && item.paid
                    ? 'PAID'
                    : 'OUT FOR DELIVERY'}
                </Text>
              </TouchableOpacity>
              {/* </View>s */}
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
      </View>
    </View>
  );
};

export default CompletedOrders;
