import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../components/BackButton';
import Icon from 'react-native-vector-icons/Feather';

const notifications = [
  {
    id: 1,
    title: 'David marked ‘Clean Room’ as done. Review it',
    subtitle: 'David finished all her chores today',
    date: '28 Jan 2024 | 04:45pm',
  },
  {
    id: 2,
    title: 'Sarah marked ‘Wash Dishes’ as done. Review it',
    subtitle: 'Sarah completed all assigned tasks',
    date: '28 Jan 2024 | 06:10pm',
  },
  {
    id: 3,
    title: 'John marked ‘Take Out Trash’ as done. Review it',
    subtitle: "John wrapped up today's chores",
    date: '29 Jan 2024 | 08:20am',
  },
  {
    id: 4,
    title: 'John marked ‘Take Out Trash’ as done. Review it',
    subtitle: "John wrapped up today's chores",
    date: '29 Jan 2024 | 08:20am',
  },
  {
    id: 5,
    title: 'John marked ‘Take Out Trash’ as done. Review it',
    subtitle: "John wrapped up today's chores",
    date: '29 Jan 2024 | 08:20am',
  },
  {
    id: 6,
    title: 'John marked ‘Take Out Trash’ as done. Review it',
    subtitle: "John wrapped up today's chores",
    date: '29 Jan 2024 | 08:20am',
  },
  {
    id: 7,
    title: 'John marked ‘Take Out Trash’ as done. Review it',
    subtitle: "John wrapped up today's chores",
    date: '29 Jan 2024 | 08:20am',
  },
];

export default function Notificationpage() {
  const [showMore, setShowMore] = useState(false);

  // Show only first 3 unless "Show more" is clicked
  const displayedNotifications = showMore
    ? notifications
    : notifications.slice(0, 3);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.notifytxt}>Notification</Text>
        <BackButton />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.notificationbox}
        >
          {displayedNotifications.map(item => (
            <View key={item.id} style={styles.notificationbox2}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.notedate}>{item.date}</Text>
            </View>
          ))}
        </ScrollView>

        {notifications.length > 3 && (
          <View style={styles.schedulebox5}>
            <TouchableOpacity
              style={styles.scheduleviewbtn2}
              onPress={() => setShowMore(!showMore)}
            >
              <Text style={styles.scheduleviewtxt2}>
                {showMore ? 'Show less' : 'Show more'}
              </Text>
              <Icon
                name={showMore ? 'chevron-up' : 'chevron-down'}
                size={12}
                color="#999999"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: '100%',
  },
  notifytxt: {
    fontSize: 28,
    fontWeight: 700,
  },

  notificationbox: {
    height: 414,
    marginTop: 10,
  },
  notificationbox2: {
    height: 98,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBlockColor: '#E2E8F9',
    padding: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: 500,
    color: '#1B1C1E',
  },

  subtitle: {
    fontSize: 14,
    fontWeight: 500,
    color: '#999999',
    marginVertical: 8,
  },
  notedate: {
    fontSize: 12,
    fontWeight: 400,
    color: '#6C7278',
    marginTop: 2,
  },
  schedulebox5: {
    width: '100%',
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleviewbtn2: {
    flex: 0,
    flexDirection: 'row',
    height: 22,
    width: 88,
    borderWidth: 1,
    borderColor: '#E2E8F9',
    borderRadius: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  scheduleviewtxt2: {
    fontSize: 10,
    color: '#1B1C1E',
    fontWeight: 400,
  },
});
