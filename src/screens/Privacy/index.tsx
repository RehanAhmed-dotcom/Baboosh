import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import Pdf from 'react-native-pdf';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon2 from 'react-native-vector-icons/Entypo';
import {pdfFile} from '../../lib/api';
const Privacy = ({navigation}) => {
  const [file, setFile] = useState('');

  const {bottom, top} = useSafeAreaInsets();
  const source = require('../../images/Privacy.pdf');
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
        <View style={{width: 40}} />
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
          Privacy Policy:
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
          flex: 1,
          //   backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pdf
          source={source}
          // onLoadComplete={(numberOfPages, filePath) => {
          //   console.log(`number of pages: ${numberOfPages}`);
          // }}
          // onPageChanged={(page, numberOfPages) => {
          //   console.log(`current page: ${page}`);
          // }}
          // onError={error => {
          //   console.log(error);
          // }}
          // onPressLink={uri => {
          //   console.log(`Link presse: ${uri}`);
          // }}
          style={{
            flex: 1,
            // backgroundColor: 'red',
            height: '100%',
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};
export default Privacy;
