import React, {useState, useEffect} from 'react';
import {useStripe} from '@stripe/stripe-react-native';
import {paymentApi} from '../../lib/api';

import {useSelector} from 'react-redux';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
export default function newPayment() {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [para, setPara] = useState({});
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  const fetchPaymentSheetParams = async () => {
    // const response = await fetch(`${API_URL}/payment-sheet`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const responce = paymentApi({
    //   Auth: user?.userdata?.api_token,
    //   payment: 100,
    //   order_id: 6,
    // }).then(res => {
    //   // console.log('res', res);
    //   setPara(res);
    // });
    console.log('respi', responce);
    // const {paymentIntent, ephemeralKey, customer} = await responce;
    // const {paymentIntent, ephemeralKey, customer} =res
    // return {
    //   paymentIntent,
    //   ephemeralKey,
    //   customer,
    // };
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
    // <Screen>
    //   <Button
    //     variant="primary"
    //     disabled={!loading}
    //     title="Checkout"
    //     onPress={openPaymentSheet}
    //   />
    // </Screen>
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => openPaymentSheet()}>
        <Text>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
}
