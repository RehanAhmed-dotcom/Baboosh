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
const FAQ = ({navigation}) => {
  const [notification, setNotification] = useState([]);
  const {top, bottom} = useSafeAreaInsets();
  const [source, setSource] = useState([]);
  const {user} = useSelector(({USER}) => ({
    user: USER.userData,
  }));
  // console.log(user);
  useEffect(() => {
    notificationList({Auth: user?.userdata?.api_token}).then(res => {
      // console.log('object', res);

      setNotification(res.data);
    });
  }, [navigation]);
  const {notificationSymbol} = useSelector(({NOTIFICATION}) => NOTIFICATION);

  console.log('user', user.userdata);
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
          <Image
            resizeMode="contain"
            source={require('../../images/Question.png')}
            style={{height: 15, width: 15}}
          />
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
            }}>
            FAQ's:
          </Text>
          <Text
            style={{
              marginTop: 20,
              paddingBottom: 50,
              fontFamily:
                Platform.OS === 'ios'
                  ? 'helveticaneue-thin'
                  : 'HelveticaNeue-Regular',
              fontSize: 14,
            }}>
            Below are some common questions we think you might have, if your
            question isn't listed here - please feel free to send us a message
            and we'll get back to you.
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
            marginTop: hp(2),
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              paddingVertical: 20,
              // borderBottomColor: 'grey',
              // borderBottomWidth: 1,
              // backgroundColor: 'red',
              // paddingBottom: 20,

              // borderStyle: 'dashed',
              // alignItems: 'center',
              borderRadius: 1,
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: 22, fontFamily: 'Boiling-BlackDemo'}}>
              How can I guarantee that your goods are 100% authentic?
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
                fontSize: 14,
              }}>
              All of our products come direct from reputable sources...in
              addition to this, they undergo thorough quality checks once they
              arrive at Baboosh HQ. Obviously depending on the brand of the
              item, it will have its own authentication indicator; usually in
              the form of a card or document which will of course be shipped
              with your item.
            </Text>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                marginTop: 20,
                //   height: 10,
                flexDirection: 'row',
                width: '100%',
                //   flexDirection: 'row',
                borderRadius: 1,
              }}></View>
          </View>
          <View
            style={{
              width: '100%',
              paddingVertical: 20,
              // borderBottomColor: 'grey',
              // borderBottomWidth: 1,
              // backgroundColor: 'red',
              // paddingBottom: 20,

              // borderStyle: 'dashed',
              //   alignItems: 'center',
              borderRadius: 1,
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: 22, fontFamily: 'Boiling-BlackDemo'}}>
              What is your returns/exchange policy?
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
                fontSize: 14,
              }}>
              As all our products come from multiple sources; including private
              sellers, we are unable to offer a return service.
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
                fontSize: 14,
              }}>
              We ask that you make sure you are 100% certain about the product
              before you confirm the order. If you are unsure about the sizing
              of any product, please get in touch with us and one of our
              stylists will be happy to offer guidance on how products fit.
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
                fontSize: 14,
              }}>
              We regret that we cannot offer exchanges as all of the products
              that we source are so limited, there isn’t availability to change
              the size. We ask again that you are confident with the product
              before you make the purchase.
            </Text>
            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                marginTop: 20,
                //   height: 10,
                flexDirection: 'row',
                width: '100%',
                //   flexDirection: 'row',
                borderRadius: 1,
              }}></View>
          </View>
          <View
            style={{
              width: '100%',
              paddingVertical: 20,
              // borderBottomColor: 'grey',
              // borderBottomWidth: 1,
              // backgroundColor: 'red',
              // paddingBottom: 20,

              // borderStyle: 'dashed',
              //   alignItems: 'center',
              borderRadius: 1,
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: 22, fontFamily: 'Boiling-BlackDemo'}}>
              How quickly will my order arrive?
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
                fontSize: 14,
              }}>
              This depends on a few factors. We can ensure that once we recieve
              the item at Baboosh HQ and it passes the quality control check, we
              will send out the next working day, however depending on what
              country we are shipping to will depend on how long it takes to
              reach you.
            </Text>
            <Text
              style={{
                marginTop: 20,
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
                fontSize: 14,
              }}>
              Although we usually work with DHL, we will also use other courier
              services to ensure the quickest delivery for you.
            </Text>

            <View
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#ccc',
                marginTop: 20,
                //   height: 10,
                flexDirection: 'row',
                width: '100%',
                //   flexDirection: 'row',
                borderRadius: 1,
              }}></View>
          </View>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            // height: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
            paddingHorizontal: 15,
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Privacy')}
            style={{
              height: 50,
              width: '45%',
              borderWidth: 1,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'black',
            }}>
            <Text
              style={{
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Terms')}
            style={{
              height: 50,
              width: '45%',
              // borderWidth: 1,
              backgroundColor: 'black',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              // borderColor: 'black',
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily:
                  Platform.OS === 'ios'
                    ? 'helveticaneue-thin'
                    : 'HelveticaNeue-Regular',
              }}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default FAQ;
