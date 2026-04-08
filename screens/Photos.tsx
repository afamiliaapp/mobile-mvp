import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PhotosBar from '../components/PhotosBar';
import AddPhotoModal from '../components/AddPhotoModal';
import AppContainer from '../components/AppContainer';
import AlbumDetail from '../components/AlbumDetail';
// Import your new component

type PhotoItem = {
  id: string;
  album: string;
  time: string;
  date: string;
  uri: string;
  fileName: string;
};

const Photos = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [activeTab, setActiveTab] = useState<'Albums' | 'Photos'>('Photos');
  const [searchQuery, setSearchQuery] = useState('');

  // ── NEW STATE: Track the currently viewed album ──────
  const [selectedAlbumName, setSelectedAlbumName] = useState<string | null>(
    null,
  );

  const renderPhotoItem = ({ item }: { item: PhotoItem }) => (
    <TouchableOpacity
      style={{
        width: '31%',
        aspectRatio: 1,
        margin: '1%',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <Image
        source={{ uri: item.uri }}
        style={{ width: '100%', height: '100%' }}
      />
    </TouchableOpacity>
  );

  const handleSave = (album: string, fileUri: string, fileName: string) => {
    const now = new Date();
    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      album,
      uri: fileUri,
      fileName,
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    };
    setPhotos(prev => [newPhoto, ...prev]);
    setModalVisible(false);
  };

  // ── DELETE LOGIC: Remove specific photos ──────────────
  const handleDeletePhotos = (ids: string[]) => {
    setPhotos(prev => prev.filter(p => !ids.includes(p.id)));
  };

  const displayData = useMemo(() => {
    const filteredPhotos = photos.filter(p =>
      p.album.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (activeTab === 'Photos') {
      return filteredPhotos;
    }

    const albumMap = new Map<string, PhotoItem>();

    filteredPhotos.forEach(photo => {
      if (!albumMap.has(photo.album)) {
        albumMap.set(photo.album, photo);
      }
    });

    return Array.from(albumMap.values());
  }, [photos, searchQuery, activeTab]);

  // ── RENDER: List Item for Gallery ─────────────────────
  const renderItem = ({ item }: { item: PhotoItem }) => (
    <View style={styles.row}>
      <View>
        <Text style={styles.albumName}>{item.album}</Text>
        <Text style={styles.meta}>
          {item.time} | {item.date}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.viewBtn}
        onPress={() => setSelectedAlbumName(item.album)} // Open Album
      >
        <Text style={styles.viewBtnText}>View</Text>
        <Icon name="chevron-right" size={13} color="#8E8E93" />
      </TouchableOpacity>
    </View>
  );

  // ── VIEW LOGIC: If an album is selected, show detail ──
  if (selectedAlbumName) {
    const albumPhotos = photos.filter(p => p.album === selectedAlbumName);
    return (
      <AppContainer>
        <AlbumDetail
          albumName={selectedAlbumName}
          photos={albumPhotos}
          onBack={() => setSelectedAlbumName(null)}
          onDeleteSelected={handleDeletePhotos}
          onDeleteAlbum={() => {
            handleDeletePhotos(albumPhotos.map(p => p.id));
            setSelectedAlbumName(null);
          }}
        />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <SafeAreaView style={styles.container}>
        <PhotosBar />
        <StatusBar barStyle="dark-content" />

        {photos.length === 0 ? (
          <View style={styles.content}>
            <Text style={styles.title}>No memories yet</Text>
            <Text style={styles.subtitle}>Upload your first family photo</Text>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => setModalVisible(true)}
            >
              <Icon name="plus" size={18} color="#f8f8f8" />
              <Text style={styles.buttonText}>New Upload</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.galleryContainer}>
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
                placeholder="Search album, photos"
                placeholderTextColor="#ADADAD"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Tab Toggle */}
            <View style={styles.tabRow}>
              {(['Albums', 'Photos'] as const).map(tab => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
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

            <FlatList
              key={activeTab}
              data={displayData}
              keyExtractor={item => item.id}
              renderItem={activeTab === 'Photos' ? renderPhotoItem : renderItem}
              numColumns={activeTab === 'Photos' ? 3 : 1}
              columnWrapperStyle={
                activeTab === 'Photos' ? { gap: 6 } : undefined
              }
              ItemSeparatorComponent={() =>
                activeTab === 'Albums' ? (
                  <View style={styles.separator} />
                ) : null
              }
              contentContainerStyle={{ paddingBottom: 100 }}
            />

            <TouchableOpacity
              style={styles.fab}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.85}
            >
              <Icon
                name="plus"
                size={16}
                color="#000"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.fabText}>New Upload</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>

      <AddPhotoModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </AppContainer>
  );
};

export default Photos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },

  // ── Empty State ──
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ADADAD',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2D2A7F',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  // ── Gallery ──
  galleryContainer: {
    flex: 1,
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
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1E',
    paddingVertical: 0,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 3,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2C247A',
  },
  tabText: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
  },
  albumName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 3,
  },
  meta: {
    fontSize: 13,
    color: '#8E8E93',
  },
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
  viewBtnText: {
    fontSize: 13,
    color: '#1C1C1E',
  },
  separator: {
    height: 1,
    backgroundColor: '#F2F2F7',
  },
  emptyText: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 40,
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  fabText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
});
