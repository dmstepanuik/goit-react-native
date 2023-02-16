const postList = [
  {
    id: '0',
    title: 'Forest',
    messageCount: 0,
    likeCount: 10,
    imgUrl: require('../assets/images/posts/img01.jpg'),
    location: 'Ukraine',
  },
  {
    id: '1',
    title: 'Sunset on the Black sea',
    messageCount: 9,
    likeCount: 255,
    imgUrl: require('../assets/images/posts/img02.jpg'),
    location: 'Ukraine',
  },
  {
    id: '2',
    title: 'Old house in Venice',
    messageCount: 1,
    likeCount: 0,
    imgUrl: require('../assets/images/posts/img03.jpg'),
    location: 'Ukraine',
  },
];

postList.splice(3)

export {postList}