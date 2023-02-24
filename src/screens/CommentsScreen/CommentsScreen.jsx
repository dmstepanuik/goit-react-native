import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {style as s} from './CommentsScreen.style';
import RoundUpIcon from '../../components/svg/RoundUp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import postsSelectors from '../../redux/posts/postsSelectors';
import authSelectors from '../../redux/auth/authSelectors';
import postOperation from '../../redux/posts/postsOperation';
import Toast from 'react-native-toast-message';

export default function CommentsScreen() {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const route = useRoute();
  const { postId, imgUri } = route.params;
  const comments = useSelector(postsSelectors.getComments);
  const sortedComments = [...comments].sort(
    (a, b) => b.dateForSort - a.dateForSort,
  );
  const { userId } = useSelector(authSelectors.getUser);
  useEffect(() => {
    dispatch(postOperation.getAllCommentsByPostId(postId));

    return () => {
      dispatch(postOperation.getAllPosts());
      dispatch(postOperation.getOwnPosts());
    };
  }, [dispatch, postId]);

  const createPost = () => {
    if (comment === '') {
      Toast.show({
        type: 'error',
        text1: 'Error:',
        text2: 'Comment must not be empty',
      });
      return;
    }
    dispatch(postOperation.addCommentByPostID(postId, comment));
    setComment('');
  };
  return (
    <View style={s.container}>
      <FlatList
        style={{ paddingHorizontal: 16 }}
        data={sortedComments}
        ListHeaderComponent={
          <View style={{ paddingVertical: 32 }}>
            <Image style={s.image} source={{ uri: imgUri }} />
          </View>
        }
        renderItem={({ item }) => {
          const isOwner = item.authorId === userId;
          return (
            <View
              style={[
                s.containerItem,
                { flexDirection: isOwner ? 'row-reverse' : 'row' },
              ]}
            >
              <Image
                source={{ uri: item.userAvatar }}
                style={[
                  s.authorAvatar,
                  { [isOwner ? 'marginLeft' : 'marginRight']: 16 },
                ]}
              />
              <View
                style={[
                  s.commentWrapper,
                  {
                    [isOwner
                      ? 'borderTopRightRadius'
                      : 'borderTopLeftRadius']: 0,
                  },
                ]}
              >
                <Text style={s.commentAuthor}>{item.comment}</Text>
                <Text
                  style={[
                    s.commentDate,
                    { textAlign: isOwner ? 'left' : 'right' },
                  ]}
                >
                  {item.date}
                </Text>
              </View>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        ListEmptyComponent={
          <View
            style={{
              height: 50,
              backgroundColor: '#ffffff',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>You have no comments yet</Text>
          </View>
        }
        ListFooterComponent={() => <View style={{ height: 30 }} />}
      />
      <View style={s.containerFooter}>
        <View>
          <TextInput
            value={comment}
            onChangeText={(text) => setComment(text)}
            placeholder="Comment..."
            placeholderTextColor="#BDBDBD"
            style={s.commentInput}
          />
          <TouchableOpacity
            style={s.iconWrapper}
            onPress={createPost}
            activeOpacity={0.7}
          >
            <RoundUpIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
