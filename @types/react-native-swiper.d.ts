declare module 'react-native-swiper' {
  import { Component } from 'react';
  import { ViewProps } from 'react-native';

  interface SwiperProps extends ViewProps {
    children?: React.ReactNode;
    horizontal?: boolean;
    loop?: boolean;
    showsPagination?: boolean;
    dotStyle?: any;
    activeDotStyle?: any;
    onIndexChanged?: (index: number) => void;
    index?: number;
    autoplay?: boolean;
    autoplayTimeout?: number;
  }

  export default class Swiper extends Component<SwiperProps> {}
}
declare module 'react-native-vector-icons/Ionicons' {
  import { ComponentType } from 'react';
  import { TextProps } from 'react-native';
  const Ionicons: ComponentType<TextProps & { name: string; size?: number; color?: string }>;
  export default Ionicons;
}
