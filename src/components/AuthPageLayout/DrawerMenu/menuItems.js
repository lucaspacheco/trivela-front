import {
  Person as PersonIcon,
  SportsSoccer as SportsSoccerIcon,
  Payment as PaymentIcon,
  EmojiEvents as EmojiEventsIcon,
  Today as TodayIcon,
  ContactSupport as ContactSupportIcon,
  Home as HomeIcon,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default [
  {
    id: 1,
    component: Link,
    to: '/',
    title: 'Página inicial',
    icon: HomeIcon,
    divider: true,
  },
  {
    id: 2,
    component: Link,
    to: '/profile',
    title: 'Meus dados cadastrais',
    icon: PersonIcon,
  },
  {
    id: 3,
    component: Link,
    to: '/my-teams',
    title: 'Meus times',
    icon: SportsSoccerIcon,
  },
  {
    id: 4,
    title: 'Meus pagamentos',
    icon: PaymentIcon,
    divider: true,
  },
  {
    id: 5,
    component: Link,
    to: '/leagues',
    title: 'Ligas',
    icon: EmojiEventsIcon,
  },
  {
    id: 6,
    title: 'Minhas ligas',
    icon: TodayIcon,
    divider: true,
  },
  {
    id: 7,
    title: 'Fale conosco',
    icon: ContactSupportIcon,
  },
];
