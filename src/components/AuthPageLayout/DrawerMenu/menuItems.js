import {
  Person as PersonIcon,
  SportsSoccer as SportsSoccerIcon,
  Payment as PaymentIcon,
  EmojiEvents as EmojiEventsIcon,
  Today as TodayIcon,
  ContactSupport as ContactSupportIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default [
  {
    id: 1,
    component: Link,
    to: '/profile',
    title: 'Meus dados cadastrais',
    icon: PersonIcon,
  },
  {
    id: 2,
    component: Link,
    to: '/my-teams',
    title: 'Meus times',
    icon: SportsSoccerIcon,
  },
  {
    id: 3,
    title: 'Meus pagamentos',
    icon: PaymentIcon,
    divider: true,
  },
  {
    id: 4,
    title: 'Ligas',
    icon: EmojiEventsIcon,
  },
  {
    id: 5,
    title: 'Minhas ligas',
    icon: TodayIcon,
    divider: true,
  },
  {
    id: 6,
    title: 'Fale conosco',
    icon: ContactSupportIcon,
  },
];
