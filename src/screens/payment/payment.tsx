import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {useStripe} from '@stripe/stripe-react-native';
import myModal from '../../component/modal';
import Icon from 'react-native-vector-icons/EvilIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PaymentView} from '../../component/payment';
import {logoutuser, notificationAlert} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Payment = ({navigation, route}) => {
  const {bottom, top} = useSafeAreaInsets();
  const {image, id, varients, total} = route.params;
  const dispatch = useDispatch();
  const axios = Axios.create({
    baseURL: 'https://intechsol.co/baboosh/api',
    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
  });
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  const [showModal, setShowModal] = useState(false);
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);
  const [vis, setVis] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  // console.log('abc', image, id, varients, total);
  useEffect(() => {
    if (paymentStatus) {
      if (paymentStatus === 'Payment Success') {
        setTimeout(() => {
          setVis(false);
          setShowModal(false);
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
      </Modal>
    );
  };
  const onCheckStatus = async paymentResponse => {
    console.log('I am callled first on tap');
    console.log('payment', paymentResponse);
    let response = JSON.parse(paymentResponse);
    if (!response) {
      console.log('!responce');
    } else if (response.error) {
      console.log('responce error');
    } else {
      console.log('i am the upper level');
      setPaymentStatus('Please wait while confirming your payment!');
      setVis(true);
      let jsonResponse = JSON.parse(paymentResponse);
      const data = new FormData();
      data.append('order_id', id);
      data.append('tokenId', jsonResponse.token.id);
      // data.append('stripe_plan', item.stripe_plan);
      // data.append('plan_duration', item.plan_duration);
      data.append('price', total);
      try {
        const stripeResponse = await axios.post(
          'https://intechsol.co/baboosh/api/payment',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              accept: 'application/json',
              Authorization: `Bearer ${user.userdata.api_token}`,
            },
          },
        );
        console.log('this payment worked in past');
        setShowModal(true);
        if (stripeResponse) {
          console.log('stripe res', stripeResponse);

          const {data} = stripeResponse;
          const {paid} = data.stripedata;
          // console.log('paid', data.stripedata.paid);
          if (paid === true) {
            setShowModal(false);
            navigation.navigate('TabNavigator');
            // addUser(stripeResponse.data.data)(dispatch);
            setPaymentStatus('Payment Success');
          } else {
            setShowModal(false);
            setPaymentStatus('Payment failed due to some issue');
          }
        } else {
          setShowModal(false);
          setPaymentStatus('Payment failed due to some issue');
        }
      } catch (error) {
        setPaymentStatus('Payment failed due to some issue');
      }
    }
  };
  const initializePaymentSheet = async () => {
    // const {paymentIntent, ephemeralKey, customer} =
    //   await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      customerId: 'cus_KSFNAyUoS3BEoQ',
      customerEphemeralKeySecret:
        'ek_test_YWNjdF8xSWR1ZGZDdkFGajlGS20yLHViZDFzUTliSnpZbGFiaVFOZVJ5QzExYUowRGpkNnc_00uD5Vvtnp',
      paymentIntentClientSecret:
        'pi_3JnKssCvAFj9FKm20oJGjNNt_secret_9rFahfcpjV9zu81XapF3bREdg',
      // allowsDelayedPaymentMethods: true, // Set `allowsDelayedPaymentMethods` to true if your business can handle payment methods that complete payment after a delay, like SEPA Debit and Sofort.
    });
    if (!error) {
      setLoading(true);
    }
  };
  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };
  useEffect(() => {
    initializePaymentSheet();
  }, []);

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
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <View style={{width: 45}}></View>
        <View>
          <Text
            style={{
              // marginLeft: 20,
              //   fontFamily: 'Nunito-SemiBold',
              fontSize: 20,
              fontFamily: 'Boiling-BlackDemo',
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
          <Image
            resizeMode="contain"
            source={require('../../images/Question.png')}
            style={{height: 15, width: 15}}
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            marginHorizontal: 15,
            paddingVertical: 30,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: 'Boiling-BlackDemo',
              paddingBottom: 30,
            }}>
            Order 001
          </Text>
        </View>
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
          <View style={{width: '100%', marginTop: hp(6), height: hp(30)}}>
            <Image
              resizeMode="contain"
              source={require('../../images/bbb.png')}
              style={{height: '100%', width: '100%'}}
            />
          </View>
          <TouchableOpacity
            onPress={() => setVis(true)}
            style={{
              width: wp(90),
              height: hp(7),
              backgroundColor: 'black',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white'}}>Pay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {myModal1()}
      {myModal(showModal)}
    </View>
  );
};
export default Payment;
