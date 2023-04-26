import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import myModal from '../../component/modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {useStripe} from '@stripe/stripe-react-native';
import {logoutuser, notificationAlert} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {paymentApi, paymentConfirm} from '../../lib/api';
import {PaymentView} from '../../component/payment';
import Axios from 'axios';
const Order = ({navigation, route}) => {
  const {id, image, varients, paid} = route.params;
  const [total, setTotal] = useState('');

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [showModal, setShowModal] = useState(false);
  console.log('var', paid);
  const [intent, setIntent] = useState('');
  const [ephermal, setEphermal] = useState('');
  const [custormer, setCustormer] = useState('');
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);
  const [vis, setVis] = useState(false);
  const [intentId, setIntentId] = useState('');
  const [para, setPara] = useState({});
  const [paymentStatus, setPaymentStatus] = useState('');
  const dispatch = useDispatch();
  // const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);
  const axios = Axios.create({
    baseURL: 'https://intechsol.co/baboosh/api',
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const {top, bottom} = useSafeAreaInsets();

  const initial = 0;
  useEffect(() => {
    setTotal(
      varients.reduce(function (total: any, currentValue: any) {
        return total + parseFloat(currentValue.price);
      }, initial),
    );
  }, []);
  useEffect(() => {
    if (paymentStatus) {
      if (paymentStatus === 'Payment Success') {
        setTimeout(() => {
          setVis(false);
          setShowModal(false);

          // navigation.navigate('TabNavigator');
          // setPay(false);
          // setParentRegistration(true);
          setPaymentStatus('');
        }, 2000);
      } else if (paymentStatus === 'Payment failed due to some issue') {
        setTimeout(() => {
          setVis(false);
          setShowModal(false);
          // setPay(false);
          setPaymentStatus('');
        }, 2000);
      }
    }
  }, [paymentStatus]);
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  // console.log('user', user?.userdata);
  const myModal1 = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={vis}
        onRequestClose={() => {
          setVis(!vis);
        }}>
        <PaymentView
          image={image}
          id={id}
          varients={varients}
          total={total}
          onCheckStatus={onCheckStatus}
        />
        {showModal === true && Platform.OS === 'ios' && (
          <View
            style={{
              zIndex: 200,
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000040',
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                height: 100,
                width: 100,
                borderRadius: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <ActivityIndicator
                color="black"
                size={'large'}
                animating={showModal}
              />
            </View>
          </View>
        )}
      </Modal>
    );
  };
  const onCheckStatus = async paymentResponse => {
    console.log('ehhehehehehehehehehehehehehehehehehehehe');
    console.log('payment', paymentResponse);
    let response = JSON.parse(paymentResponse);
    if (!response) {
      console.log('saadd', 'errrrrrOOO');
    } else if (response.error) {
      console.log('saadd', 'errrrrr');
    } else {
      setShowModal(true);
      console.log('yoooooooooooooooooooooooooo');
      setPaymentStatus('Please wait while confirming your payment!');
      // setVis(true);

      console.log('AtLast Here', response.token.id);
      const data = new FormData();
      data.append('order_id', varients[0].order_id);
      data.append('tokenId', response.token.id);
      // data.append('stripe_plan', item.stripe_plan);
      // data.append('plan_duration', item.plan_duration);
      data.append('price', total);
      // try {
      //  const stripeResponse = await
      axios
        .post('https://sourcebabooshapp.com/app/api/payment', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json',
            Authorization: `Bearer ${user.userdata.api_token}`,
          },
        })
        .then(({data, status}) => {
          console.log('slkfjlksadhfshdfklajfkljsdfj before ', showModal);
          console.log('saaddee', data.stripedata.paid);
          const {paid} = data.stripedata;

          if (paid === true) {
            setShowModal(false);
            Alert.alert('Payment Successful');
            console.log('here', 'dfdfd');
            navigation.navigate('TabNavigator', {screen: 'HOME'});
            // addUser(stripeResponse.data.data)(dispatch);
            setPaymentStatus('Payment Success');
          } else {
            setShowModal(false);
            Alert.alert('Payment Failed');
            setPaymentStatus('Payment failed due to some issue');
          }
        })
        .catch(e => {
          setShowModal(false);
          console.log('Wrong', JSON.stringify(e));
          setPaymentStatus('Payment failed due to some issue');
        });
      // console.log("api res",);
      //   console.log('saadd', stripeResponse);
      //   if (stripeResponse) {
      //     console.log('stripe res', stripeResponse);
      //     const {data} = stripeResponse;
      //     const {paid} = data.stripedata;
      //     // console.log('paid', data.stripedata.paid);
      //     if (paid === true) {
      //       navigation.navigate('TabNavigator', {tab: 1});
      //       // addUser(stripeResponse.data.data)(dispatch);
      //       setPaymentStatus('Payment Success');
      //     } else {
      //       setPaymentStatus('Payment failed due to some issue');
      //     }
      //   } else {
      //     setPaymentStatus('Payment failed due to some issue');
      //   }
      // } catch (error) {
      //   setPaymentStatus('Payment failed due to some issue');
      // }
    }
  };
  console.log('total', total);
  console.log('id', id);
  const fetchPaymentSheetParams = async () => {
    // const response = await fetch(`${API_URL}/payment-sheet`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    const responce = await paymentApi({
      Auth: user?.userdata?.api_token,
      payment: total,
      order_id: id,
    });
    console.log('respi', responce);
    const {paymentIntent, ephemeralKey, customer} = await responce;
    setIntent(responce.paymentIntent);
    setEphermal(responce.ephemeralKey);
    setCustormer(responce.customer);
    setIntentId(responce.payment_intent_id);
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };
  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();
    console.log('responce paymentIntent', paymentIntent);
    console.log('responce ephermalKey', ephemeralKey);
    console.log('responce curtomer', customer);
    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // allowsDelayedPaymentMethods: true, // Set `allowsDelayedPaymentMethods` to true if your business can handle payment methods that complete payment after a delay, like SEPA Debit and Sofort.
    });
    if (!error) {
      // setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();
    // console.log('object', error);
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      paymentConfirm({
        Auth: user?.userdata?.api_token,
        payment_intent_id: intentId,
        customer_id: custormer,
        order_id: id,
      }).then(res => {
        if (res) {
          navigation.navigate('TabNavigator', {screen: 'HOME'});
          Alert.alert('Success', 'Your order is confirmed!');
        } else {
          Alert.alert('Payment failed');
        }
      });
      // .catch(err => {
      //
      // });
    }
  };
  useEffect(() => {
    initializePaymentSheet();
  }, []);
  console.log('int', intent);
  console.log('pehr', ephermal);
  console.log('cus', custormer);
  console.log('intend id', intentId);
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
          <Icon1 name="arrowleft" size={20} onPress={navigation.goBack} />
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
      <ScrollView>
        <View
          style={{
            width: '100%',
            marginTop: 30,
            paddingHorizontal: 20,
            //   height: 30,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontFamily: 'Boiling-BlackDemo'}}>
            Confirm your order :
          </Text>
          <View
            style={{
              width: '100%',
              marginTop: hp(6),
              height: hp(30),
              // backgroundColor: 'red',
            }}>
            <Image
              resizeMode="contain"
              source={{uri: image}}
              // source={require('../../images/music_icon.png')}
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
                  style={{
                    fontSize: 14,
                    fontFamily:
                      Platform.OS == 'android'
                        ? 'HelveticaNeue-Regular'
                        : 'helveticaneue-thin',
                  }}>
                  {item.quantity} x {item.variant_title}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily:
                    Platform.OS == 'android'
                      ? 'HelveticaNeue-Regular'
                      : 'helveticaneue-thin',
                }}>
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
          <Text
            style={{
              fontSize: 14,
              fontFamily:
                Platform.OS == 'android'
                  ? 'HelveticaNeue-Regular'
                  : 'helveticaneue-thin',
            }}>
            Total cost{' '}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily:
                Platform.OS == 'android'
                  ? 'HelveticaNeue-Regular'
                  : 'helveticaneue-thin',
            }}>
            £ {total}
          </Text>
        </View>
        {!paid && (
          <TouchableOpacity
            // onPress={() => setVis(true)}
            onPress={() => openPaymentSheet()}
            style={{
              //   width: '100%',
              height: hp(7),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              marginHorizontal: 20,
              marginTop: 20,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontFamily:
                  Platform.OS == 'android'
                    ? 'HelveticaNeue-Regular'
                    : 'helveticaneue-thin',
              }}>
              Accept Order
            </Text>
          </TouchableOpacity>
        )}

        <View style={{height: 30}}></View>
      </ScrollView>
      {myModal1()}

      {myModal(showModal)}
    </View>
  );
};
export default Order;
