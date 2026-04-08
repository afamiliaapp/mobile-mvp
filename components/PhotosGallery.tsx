import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
// 16 padding on each side (32 total) + 6 gap between 3 items (12 total)
const GRID_ITEM_SIZE = (width - 32 - 12) / COLUMN_COUNT;

type PhotoItem = {
  id: string;
  album: string;
  time: string;
  date: string;
  uri: string;
};

type Props = {
  photos?: PhotoItem[];
  onView?: (item: PhotoItem) => void;
};

const PhotosGallery = ({ photos = [], onView }: Props) => {
  const [activeTab, setActiveTab] = useState<'Albums' | 'Photos'>('Photos');
  const [searchQuery, setSearchQuery] = useState('');

  const displayData = useMemo(() => {
    // Filter first
    const filteredPhotos = photos.filter(p =>
      p.album.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (activeTab === 'Photos') {
      // ✅ ONLY return real photos (no grouping)
      return filteredPhotos;
    }

    // ✅ Albums: group by album name
    const albumMap = new Map<string, PhotoItem>();

    filteredPhotos.forEach(photo => {
      if (!albumMap.has(photo.album)) {
        albumMap.set(photo.album, photo); // representative image
      }
    });

    return Array.from(albumMap.values());
  }, [photos, searchQuery, activeTab]);

  // --- RENDERING ALBUMS (LIST) ---
  const renderAlbumItem = ({ item }: { item: PhotoItem }) => (
    <TouchableOpacity
      style={styles.albumRow}
      onPress={() => onView?.(item)}
      activeOpacity={0.8}
    >
      {/* Album Cover */}
      <Image source={{ uri: item.uri }} style={styles.albumImage} />

      {/* Album Info */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.albumName}>{item.album}</Text>
        <Text style={styles.meta}>{item.date}</Text>
      </View>

      <Icon name="chevron-right" size={16} color="#8E8E93" />
    </TouchableOpacity>
  );
  // --- RENDERING PHOTOS (GRID) ---
  const renderPhotoItem = ({ item }: { item: PhotoItem }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => onView?.(item)}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.gridImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Icon
          name="search"
          size={16}
          color="#8E8E93"
          style={{ marginRight: 8 }}
        />
        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${activeTab.toLowerCase()}...`}
          placeholderTextColor="#ADADAD"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="x" size={16} color="#8E8E93" />
          </TouchableOpacity>
        )}
      </View>

      {/* Tab Toggle */}
      <View style={styles.tabRow}>
        {(['Albums', 'Photos'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => {
              setSearchQuery(''); // Clear search when switching tabs
              setActiveTab(tab);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dynamic List/Grid */}
      <FlatList
        key={activeTab} // RE-MOUNTS LIST TO SWITCH numColumns WITHOUT CRASHING
        data={displayData}
        keyExtractor={item => item.id}
        numColumns={activeTab === 'Photos' ? COLUMN_COUNT : 1}
        renderItem={activeTab === 'Photos' ? renderPhotoItem : renderAlbumItem}
        columnWrapperStyle={activeTab === 'Photos' ? styles.gridRow : null}
        ItemSeparatorComponent={() =>
          activeTab === 'Albums' ? <View style={styles.separator} /> : null
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found</Text>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#4F46E5',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 14,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#1C1C1E' },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 3,
    marginBottom: 16,
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#2C247A' },
  tabText: { fontSize: 14, color: '#8E8E93', fontWeight: '500' },
  activeTabText: { color: '#fff' },

  // Album Tab (List)
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  albumName: { fontSize: 15, fontWeight: '600', color: '#1C1C1E' },
  meta: { fontSize: 13, color: '#8E8E93' },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  viewBtnText: { fontSize: 13, color: '#1C1C1E' },
  separator: { height: 1, backgroundColor: '#F2F2F7' },

  // Photo Tab (Grid)
  gridRow: { gap: 6, marginBottom: 6 },
  gridItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F2F2F7',
  },
  gridImage: { width: '100%', height: '100%' },

  emptyText: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 40,
    fontSize: 14,
  },
  albumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  albumImage: {
    width: 55,
    height: 55,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
});

export default PhotosGallery;
