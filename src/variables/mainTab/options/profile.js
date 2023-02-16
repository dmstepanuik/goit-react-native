import UserIcon from '../../../components/svg/UserIcon';

export const profile = {
  title: 'Profile',
  headerShown: false,
  tabBarIcon: ({ color, size }) => (
    <UserIcon color={color} size={size} />
  ),
}