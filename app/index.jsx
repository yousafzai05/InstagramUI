import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Dummy data for stories
const stories = [
  { id: '1', name: 'Your Story', image: require('../assets/images/story1.jpg'), isYourStory: true },
  { id: '2', name: 'ali_raza', image: require('../assets/images/story2.jpg') },
  { id: '3', name: 'sara_khan', image: require('../assets/images/story3.jpg') },
  { id: '4', name: 'john_doe', image: require('../assets/images/story4.jpg') },
  { id: '5', name: 'ayesha_72', image: require('../assets/images/story5.jpg') },
  { id: '6', name: 'khan_sahab', image: require('../assets/images/story6.jpg') },
  { id: '7', name: 'zara_ali', image: require('../assets/images/story7.jpg') },
  { id: '8', name: 'usman_22', image: require('../assets/images/story8.jpg') },
  { id: '9', name: 'fatima_56', image: require('../assets/images/story9.jpg') },
  { id: '10', name: 'raza_ahmed', image: require('../assets/images/story10.jpg') },
];

// Dummy data for posts
const posts = [
  {
    id: '1',
    username: 'john_doe',
    location: 'New York, USA',
    profileImage: require('../assets/images/profile1.jpg'),
    postImage: require('../assets/images/post1.jpg'),
    likes: 2350,
    caption: '"With great power comes great responsibility"',
    time: '3 hours ago',
  },
  {
    id: '2',
    username: 'ali_khan',
    location: 'Dubai, UAE',
    profileImage: require('../assets/images/profile2.jpg'),
    postImage: require('../assets/images/post2.jpg'),
    likes: 1800,
    caption: '“When you die, I will be the one writing your name in my Death Note.”',
    time: '5 hours ago',
  },
  {
    id: '3',
    username: 'sara_ali',
    location: 'Lahore, Pakistan',
    profileImage: require('../assets/images/profile3.jpg'),
    postImage: require('../assets/images/post3.jpg'),
    likes: 3100,
    caption: '“I have set myself to become the King of the Pirates… and if I die trying… then at least I tried!”',
    time: '7 hours ago',
  },
  {
    id: '4',
    username: 'ayesha_raza',
    location: 'Karachi, Pakistan',
    profileImage: require('../assets/images/profile4.jpg'),
    postImage: require('../assets/images/post4.jpg'),
    likes: 450,
    caption: 'Exploring the city streets. Every corner tells a story.',
    time: '12 hours ago',
  },
  {
    id: '5',
    username: 'usman_haider',
    location: 'Islamabad, Pakistan',
    profileImage: require('../assets/images/profile5.jpg'),
    postImage: require('../assets/images/post5.jpg'),
    likes: 1200,
    caption: 'Avengers, assemble!',
    time: '1 day ago',
  },
];

// Profile data
const profile = {
  username: 'marjan_usafxai',
  fullName: 'Marjan Yousafzai',
  bio: 'React Native Developer\nBuilding mobile apps',
  website: 'www.coral.com',
  profileImage: require('../assets/images/profile.jpg'),
  posts: 12,
  followers: '5.9K',
  following: 420,
};

// Highlights data
const highlights = [
  { id: '1', title: 'Travel', image: require('../assets/images/highlight1.jpg') },
  { id: '2', title: 'Family', image: require('../assets/images/highlight2.jpg') },
  { id: '3', title: 'Hobbies', image: require('../assets/images/highlight3.jpg') },
  { id: '4', title: 'Nature', image: require('../assets/images/highlight4.jpg') },
  { id: '5', title: 'Food', image: require('../assets/images/highlight5.jpg') },
];

// Profile grid posts (12 images)
const profilePosts = [
  { id: '1', image: require('../assets/images/grid1.jpg') },
  { id: '2', image: require('../assets/images/grid2.jpg') },
  { id: '3', image: require('../assets/images/grid3.jpg') },
  { id: '4', image: require('../assets/images/grid4.jpg') },
  { id: '5', image: require('../assets/images/grid5.jpg') },
  { id: '6', image: require('../assets/images/grid6.jpg') },
  { id: '7', image: require('../assets/images/grid7.jpg') },
  { id: '8', image: require('../assets/images/grid8.jpg') },
  { id: '9', image: require('../assets/images/grid9.jpg') },
  { id: '10', image: require('../assets/images/grid10.jpg') },
  { id: '11', image: require('../assets/images/grid11.jpg') },
  { id: '12', image: require('../assets/images/grid12.jpg') },
];

// Story View Component - Full screen story
const StoryView = ({ story, onClose }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate story opening
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      })
    ]).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start();

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      closeStory();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closeStory = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Modal transparent visible={true} animationType="none">
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.storyModal, { opacity: fadeAnim }]}>
        <TouchableOpacity 
          style={styles.storyTouchable} 
          activeOpacity={1}
          onPress={closeStory}
        >
          <Animated.View style={[styles.storyContent, { transform: [{ scale: scaleAnim }] }]}>
            {/* Progress bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
              </View>
            </View>

            {/* Story header */}
            <View style={styles.storyHeader}>
              <Image source={story.image} style={styles.storyHeaderImage} />
              <Text style={styles.storyHeaderName}>{story.name}</Text>
              <Text style={styles.storyHeaderTime}>• 0s</Text>
            </View>

            {/* Close button */}
            <TouchableOpacity style={styles.storyCloseBtn} onPress={closeStory}>
              <Text style={styles.storyCloseText}>✕</Text>
            </TouchableOpacity>

            {/* Story image */}
            <Image source={story.image} style={styles.storyFullImage} resizeMode="contain" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

// Story item component
const StoryItem = ({ name, image, onPress, isYourStory }) => (
  <TouchableOpacity onPress={() => onPress({ name, image })} activeOpacity={0.7}>
    <View style={styles.storyItem}>
      <View style={[styles.storyImageContainer, isYourStory && styles.yourStoryContainer]}>
        <Image source={image} style={styles.storyImage} />
        {isYourStory && (
          <View style={styles.yourStoryPlus}>
            <Text style={styles.plusIcon}>+</Text>
          </View>
        )}
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {isYourStory ? 'Your Story' : name}
      </Text>
    </View>
  </TouchableOpacity>
);

// Post card component
const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.postCard}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.postHeaderLeft}>
          <Image source={post.profileImage} style={styles.postProfileImage} />
          <View>
            <Text style={styles.postUsername}>{post.username}</Text>
            <Text style={styles.postLocation}>{post.location}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <TouchableOpacity activeOpacity={0.9}>
        <View style={styles.postImageContainer}>
          <Image 
            source={post.postImage} 
            style={styles.postImage} 
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>

      {/* Action Icons */}
      <View style={styles.actionIcons}>
        <View style={styles.actionLeft}>
          <TouchableOpacity onPress={handleLike}>
            <Text style={[styles.actionIcon, isLiked && styles.likedIcon]}>
              {isLiked ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionIcon}>➤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
          <Text style={styles.actionIcon}>{isSaved ? '💾' : '💭'}</Text>
        </TouchableOpacity>
      </View>

      {/* Post Information */}
      <View style={styles.postInfo}>
        <Text style={styles.likes}>{likesCount.toLocaleString()} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.usernameText}>{post.username}</Text> {post.caption}
        </Text>
        <Text style={styles.time}>{post.time}</Text>
      </View>
    </View>
  );
};

// Highlight component
const HighlightItem = ({ title, image }) => (
  <View style={styles.highlightItem}>
    <View style={styles.highlightImageContainer}>
      <Image source={image} style={styles.highlightImage} />
    </View>
    <Text style={styles.highlightTitle}>{title}</Text>
  </View>
);

// Grid item component
const GridItem = ({ image }) => (
  <TouchableOpacity activeOpacity={0.8}>
    <Image source={image} style={styles.gridImage} />
  </TouchableOpacity>
);

// Feed Screen
function FeedScreen({ onStoryPress }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Text style={styles.headerIcon}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Text style={styles.headerIcon}>💬</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.storiesWrapper}>
            <FlatList
              data={stories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <StoryItem 
                  name={item.name} 
                  image={item.image} 
                  onPress={onStoryPress}
                  isYourStory={item.isYourStory || false}
                />
              )}
              style={styles.storiesList}
              contentContainerStyle={styles.storiesContent}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// Profile Screen
function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <FlatList
        data={profilePosts}
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GridItem image={item.image} />}
        ListHeaderComponent={() => (
          <>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <View style={styles.profileImageWrapper}>
                <Image source={profile.profileImage} style={styles.profileImage} />
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{profile.posts}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{profile.followers}</Text>
                  <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{profile.following}</Text>
                  <Text style={styles.statLabel}>Following</Text>
                </View>
              </View>
            </View>

            {/* Profile Info */}
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{profile.username}</Text>
              <Text style={styles.fullName}>{profile.fullName}</Text>
              <Text style={styles.bio}>{profile.bio}</Text>
              <Text style={styles.website}>{profile.website}</Text>
            </View>

            {/* Profile Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.buttonText}>Share Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileButton}>
                <Text style={styles.buttonText}>Contact</Text>
              </TouchableOpacity>
            </View>

            {/* Story Highlights */}
            <View style={styles.highlightsWrapper}>
              <FlatList
                data={highlights}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <HighlightItem title={item.title} image={item.image} />
                )}
                style={styles.highlightsList}
                contentContainerStyle={styles.highlightsContent}
              />
            </View>

            {/* Profile Tabs */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                <Text style={[styles.tabText, styles.activeTabText]}>📷</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>▶️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>🏷️</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

// Main App
export default function App() {
  const [activeTab, setActiveTab] = useState('Feed');
  const [selectedStory, setSelectedStory] = useState(null);

  const handleStoryPress = (story) => {
    setSelectedStory(story);
  };

  const handleCloseStory = () => {
    setSelectedStory(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {activeTab === 'Feed' ? (
        <FeedScreen onStoryPress={handleStoryPress} />
      ) : (
        <ProfileScreen />
      )}

      {/* Story Modal */}
      {selectedStory && (
        <StoryView story={selectedStory} onClose={handleCloseStory} />
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          onPress={() => setActiveTab('Feed')} 
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeTab === 'Feed' && styles.activeNavIcon]}>
            {activeTab === 'Feed' ? '🏠' : '🏠'}
          </Text>
          <Text style={[styles.navText, activeTab === 'Feed' && styles.activeNavText]}>
            Home
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => setActiveTab('Profile')} 
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Text style={[styles.navIcon, activeTab === 'Profile' && styles.activeNavIcon]}>
            👤
          </Text>
          <Text style={[styles.navText, activeTab === 'Profile' && styles.activeNavText]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'System',
    color: '#000',
    letterSpacing: -0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  headerIconBtn: {
    padding: 4,
  },
  headerIcon: {
    fontSize: 24,
  },
  storiesWrapper: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  storiesList: {
    backgroundColor: '#fff',
  },
  storiesContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 74,
  },
  storyImageContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e95950',
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  yourStoryContainer: {
    borderColor: '#dbdbdb',
    position: 'relative',
  },
  yourStoryPlus: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#0095f6',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  plusIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  storyName: {
    fontSize: 11,
    marginTop: 4,
    color: '#262626',
    textAlign: 'center',
  },
  postCard: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postProfileImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
  },
  postUsername: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },
  postLocation: {
    fontSize: 11,
    color: '#8e8e8e',
  },
  menuIcon: {
    fontSize: 20,
    color: '#262626',
    fontWeight: 'bold',
  },
  postImageContainer: {
    width: width,
    height: width,
    backgroundColor: '#f0f0f0',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  actionIcon: {
    fontSize: 24,
  },
  likedIcon: {
    fontSize: 24,
  },
  postInfo: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  likes: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    color: '#262626',
    marginBottom: 2,
    lineHeight: 18,
  },
  usernameText: {
    fontWeight: '600',
  },
  time: {
    fontSize: 10,
    color: '#8e8e8e',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  profileImageWrapper: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 2,
  },
  profileImage: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626',
  },
  statLabel: {
    fontSize: 13,
    color: '#8e8e8e',
    marginTop: 2,
  },
  profileInfo: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  fullName: {
    fontSize: 14,
    color: '#262626',
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    color: '#262626',
    marginTop: 2,
    lineHeight: 18,
  },
  website: {
    fontSize: 14,
    color: '#00376b',
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  profileButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#262626',
  },
  highlightsWrapper: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  highlightsList: {
    backgroundColor: '#fff',
  },
  highlightsContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  highlightItem: {
    alignItems: 'center',
    marginHorizontal: 6,
    width: 74,
  },
  highlightImageContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: '#dbdbdb',
    padding: 2,
  },
  highlightImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },
  highlightTitle: {
    fontSize: 11,
    color: '#262626',
    marginTop: 4,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#262626',
  },
  tabText: {
    fontSize: 20,
    color: '#8e8e8e',
  },
  activeTabText: {
    color: '#262626',
  },
  gridImage: {
    width: width / 3,
    height: width / 3,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navIcon: {
    fontSize: 22,
    color: '#8e8e8e',
  },
  navText: {
    fontSize: 10,
    color: '#8e8e8e',
    marginTop: 2,
  },
  activeNavText: {
    color: '#0095f6',
    fontWeight: '600',
  },
  activeNavIcon: {
    color: '#262626',
  },
  // Story Modal Styles
  storyModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyTouchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyContent: {
    width: width,
    height: height,
    backgroundColor: '#000',
    position: 'relative',
  },
  storyFullImage: {
    width: '100%',
    height: '100%',
  },
  progressContainer: {
    position: 'absolute',
    top: 44,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  progressTrack: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  storyHeader: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  storyHeaderImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  storyHeaderName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
  },
  storyHeaderTime: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 6,
    opacity: 0.7,
  },
  storyCloseBtn: {
    position: 'absolute',
    top: 50,
    right: 16,
    zIndex: 10,
    padding: 8,
  },
  storyCloseText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
  },
});
