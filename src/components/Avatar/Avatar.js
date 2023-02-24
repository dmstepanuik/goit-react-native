import * as ImagePicker from 'expo-image-picker';
import uploadPhotoToServer, {
  firebaseStore,
} from '../../api/uploadPhotoToServer';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AddIcon from '../svg/AddIcon';
import DeleteIcon from '../svg/DeleteIcon';

export default function Avatar({ avatarImg, setAvatarImg }) {
  const onPressBtn = async () => {
    if (avatarImg) return setAvatarImg('');

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const photoUrl = await uploadPhotoToServer(
        result.assets[0].uri,
        firebaseStore.avatar,
      );
      setAvatarImg(photoUrl);
    }
  };

  return (
    <View style={st.container}>
      {avatarImg && <Image style={st.img} source={{ uri: avatarImg }} />}
      <TouchableOpacity style={st.btn} onPress={onPressBtn}>
        {!avatarImg ? <AddIcon /> : <DeleteIcon />}
      </TouchableOpacity>
    </View>
  );
}

const st = StyleSheet.create({
  container: {
    position: 'relative',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  img: {
    // position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  btn: {
    position: 'absolute',
    right: -12,
    bottom: 14,
    width: 25,
    height: 25,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
});
