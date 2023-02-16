import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import KeyboardContainer from '../../components/KeyboardContainer/KeyboardContainer';
import { style as s } from './CreatePostsScreen.style';
import CameraBtn from '../../components/CameraBtn/CameraBtn';
import MapPinIcon from '../../components/svg/MapPinIcon';
import Btn from '../../components/Btn/Btn';
import TrashIcon from '../../components/svg/TrashIcon';
import { useState } from 'react';

const initValues = { title: '', place: '' };

export default function CreatePostsScreen({ imgUrl }) {
  const [values, setValues] = useState(initValues);
  const onChangeText = (value, name) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  return (
    <KeyboardContainer style={s.container}>
      <View style={{ marginBottom: 32 }}>
        <View style={[s.imgWrapper, { marginBottom: 8 }]}>
          <Image style={s.img} source={imgUrl} />
          <View style={s.cameraBtnWrapper}>
            <CameraBtn isEdit={!!imgUrl} />
          </View>
        </View>
        <Text style={s.imgText}>
          {imgUrl ? 'Edit' : 'Load'} photo
        </Text>
      </View>
      <View style={[s.inputWrapper, { marginBottom: 16 }]}>
        <TextInput
          style={s.input}
          placeholder="Name..." // TODO make roboto 400
          placeholderTextColor="#BDBDBD"
          value={values.title}
          onChangeText={v => onChangeText(v, 'title')}
        />
      </View>
      <View style={[s.inputWrapper, { marginBottom: 32 }]}>
        <MapPinIcon style={s.inputIcon} />
        <TextInput
          style={s.input}
          placeholder="Location..."
          placeholderTextColor="#BDBDBD"
          value={values.place}
          onChangeText={v => onChangeText(v, 'place')}
        />
      </View>
      <Btn
        onPress={() => {
          console.log(values);
          // setIsAuth(true);
        }}
        text="Publish"
        // disabled
      />
      <TouchableOpacity
        style={{ marginTop: 'auto', alignSelf: 'center' }}
        activeOpacity={0.7}
        onPress={() => setValues(initValues)}
      >
        <TrashIcon />
      </TouchableOpacity>
    </KeyboardContainer>
  );
}
