import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {logoutuser, notificationAlert} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const OrderDetails = ({navigation, route}) => {
  const {id, image, price, varients, title} = route.params;
  // console.log('var', varients);
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);
  const dispatch = useDispatch();
  const {top, bottom} = useSafeAreaInsets();
  const [total, setTotal] = useState('');
  const initial = 0;
  useEffect(() => {
    setTotal(
      varients.reduce(function (total: any, currentValue: any) {
        return total + parseFloat(currentValue.price);
      }, initial),
    );
  }, []);
  // console.log('total', total);
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
              fontSize: 18,
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
            Order 00{id}
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
            width: '100%',
            marginTop: 30,
            paddingHorizontal: 20,
            //   height: 30,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontFamily: 'Boiling-BlackDemo'}}>
            Confirmed order :
          </Text>
          <View style={{width: '100%', marginTop: hp(6), height: hp(30)}}>
            <Image
              resizeMode="contain"
              source={{uri: image}}
              style={{height: '100%', width: '100%'}}
            />
          </View>
        </View>
        <View
          style={{
            // borderBottomColor: 'red',
            // borderBottomWidth: 1,
            marginHorizontal: 10,
            // borderStyle: 'dotted',
            paddingHorizontal: 10,
          }}>
          {varients.map((item: any, index: number) => (
            <View
              key={index + 'a'}
              style={{
                width: '100%',

                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
                // paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{fontSize: 14, fontFamily: 'HelveticaNeue-Medium'}}>
                  {item.quantity} x {item.variant_title}
                </Text>
              </View>
              <Text style={{fontSize: 14, fontFamily: 'HelveticaNeue-Medium'}}>
                £ {item.price}
              </Text>
            </View>
          ))}

          <View
            style={{
              borderStyle: 'dashed',
              borderWidth: 1,
              borderColor: '#ccc',
              //   flexDirection: 'row',
              borderRadius: 1,
            }}></View>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            //   marginTop: 30,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 14, fontFamily: 'HelveticaNeue-Medium'}}>
            Total cost{' '}
          </Text>
          <Text style={{fontSize: 14, fontFamily: 'HelveticaNeue-Medium'}}>
            £ {total}
          </Text>
        </View>

        <View style={{height: 30}}></View>
      </ScrollView>
    </View>
  );
};
export default OrderDetails;
