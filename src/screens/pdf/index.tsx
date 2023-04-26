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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon2 from 'react-native-vector-icons/Entypo';
import {pdfFile} from '../../lib/api';
const pdf = ({navigation}) => {
  const [file, setFile] = useState('');

  const {bottom, top} = useSafeAreaInsets();
  useEffect(() => {
    pdfFile().then(res => {
      console.log('res', res);
      setFile(res.book_url);
    });
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
          flexDirection: 'row',
          paddingHorizontal: 10,
          justifyContent: 'flex-end',
        }}>
        <Icon2
          name={'circle-with-cross'}
          // style={{top: 30, zIndex: 1}}
          size={20}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          flex: 1,
          //   backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pdf
          source={{
            uri: file,
            cache: true,
          }}
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
export default pdf;
