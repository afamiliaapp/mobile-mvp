import React, { useRef, useEffect } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Dimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useMenu } from '../context/Menucontex';

const { width, height } = Dimensions.get('window');

// 1. Reduced size by 2px (64 -> 62)
const CIRCLE_SIZE = 62;
const BOTTOM_MARGIN = 40;

// 2. Position the anchor at the bottom center
const CX = width / 2;
const CY = height - BOTTOM_MARGIN - CIRCLE_SIZE / 2;

const RADIUS = 140; // The distance of the icons from the center

const ITEMS = [
  { id: 'chores', label: 'Chores', icon: 'check-square', route: 'Chores' },
  { id: 'expenses', label: 'Expenses', icon: 'credit-card', route: 'Expenses' },
  { id: 'photos', label: 'Photos', icon: 'image', route: 'Photos' },
  {
    id: 'child-control',
    label: 'Child Control',
    icon: 'shield',
    route: 'ChildControl',
  },
  {
    id: 'meal-planner',
    label: 'Meal Planner',
    icon: 'coffee',
    route: 'Meal',
  },
];

// 3. Calculate Arc Positions (180 to 360 degrees)
const GET_ARC_POSITIONS = (index, total) => {
  // Distribute items evenly from Math.PI (180°) to 2*Math.PI (360°)
  const angle = Math.PI + index * (Math.PI / (total - 1));
  return {
    x: RADIUS * Math.cos(angle),
    y: RADIUS * Math.sin(angle),
  };
};

export default function Menu() {
  const { menuOpen, closeMenu } = useMenu();
  const navigation = useNavigation();

  const backdropAnim = useRef(new Animated.Value(0)).current;
  const itemAnims = useRef(ITEMS.map(() => new Animated.Value(0))).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (menuOpen) {
      Animated.timing(backdropAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      Animated.parallel(
        itemAnims.map((anim, i) =>
          Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
            delay: i * 50,
          }),
        ),
      ).start();
      Animated.spring(rotateAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 80,
        friction: 8,
      }).start();
    } else {
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
      itemAnims.forEach(a => a.setValue(0));
      rotateAnim.setValue(0);
    }
  }, [menuOpen]);

  const handleItemPress = (route: string) => {
    closeMenu();
    setTimeout(() => navigation.navigate(route as never), 100);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  if (!menuOpen) return null;

  return (
    <View style={styles.root} pointerEvents="box-none">
      <Animated.View style={[styles.backdrop, { opacity: backdropAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
      </Animated.View>

      {ITEMS.map((item, i) => {
        // Calculate the perfect arc position for each item
        const pos = GET_ARC_POSITIONS(i, ITEMS.length);
        const anim = itemAnims[i];

        return (
          <Animated.View
            key={item.id}
            style={[
              styles.itemWrapper,
              {
                left: CX + pos.x - CIRCLE_SIZE / 2,
                top: CY + pos.y - CIRCLE_SIZE / 2,
              },
              {
                opacity: anim,
                transform: [
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1],
                    }),
                  },
                  {
                    translateY: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.labelContainer}>
              <Text style={styles.itemLabel}>{item.label}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.itemCircle,
                pressed && styles.itemCirclePressed,
              ]}
              onPress={() => handleItemPress(item.route)}
            >
              <Icon name={item.icon} size={22} color="#2C247A" />
            </Pressable>
          </Animated.View>
        );
      })}

      {/* CLOSE BUTTON (Pinned to the bottom center) */}
      <Animated.View
        style={[
          styles.closeWrapper,
          { left: CX - CIRCLE_SIZE / 2, top: CY - CIRCLE_SIZE / 2 },
          { transform: [{ rotate }, { scale: backdropAnim }] },
        ]}
      >
        <Pressable style={styles.closeBtn} onPress={closeMenu}>
          <Icon name="x" size={20} color="#555" />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  itemWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: CIRCLE_SIZE,
  },
  labelContainer: {
    position: 'absolute',
    top: -25, // Moves label above the circle
    width: 100,
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1B1C1E',
    textAlign: 'center',
  },
  itemCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E2E8F9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemCirclePressed: {
    backgroundColor: '#F0EEFF',
    borderColor: '#2C247A',
  },
  closeWrapper: {
    position: 'absolute',
  },
  closeBtn: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E2E8F9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
