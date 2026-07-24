# Instagram UI Clone - React Native

A beautifully crafted React Native mobile application that replicates the core Instagram user interface. The application features a functional Feed Screen with stories and posts, along with a comprehensive Profile Screen containing user statistics, story highlights, and a photo grid.

The project is built using React Native and Expo with dummy data to provide a realistic Instagram-like mobile experience.

## Sections

| Feed Screen  | Profile Screen  | Story View    |
| ------------ | --------------- | ------------- |
| Feed Preview | Profile Preview | Story Preview |


## Features

### Feed Screen

* Instagram-style header with logo and action icons
* Horizontally scrollable Stories section
* Circular profile pictures with username labels
* "Your Story" with an add icon
* Minimum 10 dummy stories with consistent spacing
* Post header containing:

  * Profile picture
  * Username
  * Location
  * More options menu
* Responsive post images with proper aspect ratios
* Post action buttons:

  * Like
  * Comment
  * Share
  * Save
* Interactive like and unlike functionality
* Like counter
* Post captions with usernames
* Comments count
* Post timestamp
* 5+ dummy posts for realistic feed content

### Profile Screen

* Circular profile picture
* Username and full name
* User bio
* Website link
* Profile statistics:

  * Posts
  * Followers
  * Following
* Profile action buttons:

  * Edit Profile
  * Share Profile
  * Contact
* Horizontally scrollable Story Highlights
* Circular highlight images
* Highlight titles
* Minimum 5 story highlights
* Profile navigation tabs:

  * Posts
  * Reels
  * Tagged
* Three-column photo grid
* Minimum 12 square images
* Instagram-style spacing and layout

### Interactive Features

* Full-screen story viewer
* Story progress bar
* Like and unlike posts
* Animated interaction feedback
* Save and unsave posts
* Bottom navigation between Feed and Profile
* Smooth animations and transitions
* Responsive layout for different screen sizes

## Technologies Used

* **React Native** - Mobile application framework
* **Expo** - Development and build platform
* **React Navigation** - Screen and bottom tab navigation
* **Animated API** - Animations and transitions
* **FlatList** - Efficient rendering of lists
* **Dimensions API** - Responsive screen dimensions
* **StyleSheet** - Component styling and layout

## Prerequisites

Before running the project, make sure you have the following installed:

* Node.js (v14 or later)
* npm or Yarn
* Expo CLI or Expo development tools
* Android Emulator or iOS Simulator
* Expo Go for testing on a physical device
* Visual Studio Code (recommended)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yousafzai05/instagramUI.git
cd instagramUI
```

### 2. Install Dependencies

```bash
npm install
```

Or, if you use Yarn:

```bash
yarn install
```

### 3. Install Additional Dependencies

If required by the project, install the navigation dependencies:

```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
```

```bash
npm install react-native-screens react-native-safe-area-context
```

### 4. Start the Application

```bash
npm start
```

Or:

```bash
npx expo start
```

### 5. Run on a Device

* Press `a` to open the application in an Android emulator
* Press `i` to open the application in an iOS simulator
* Scan the QR code using the Expo Go application on a physical device

## Project Structure

```text
instagramUI/
├── app/
│   └── index.jsx          # Main application screen
├── assets/
│   └── images/            # Application images
│       ├── story1.jpg
│       ├── post1.jpg
│       ├── profile1.jpg
│       └── ...
├── .gitignore
├── app.json
├── package.json
└── README.md
```

## Design System

### Colors

* **Primary:** `#FFFFFF` - White
* **Text:** `#262626` - Dark Gray
* **Secondary Text:** `#8E8E8E` - Gray
* **Instagram Blue:** `#0095F6`
* **Story Border:** `#E95950` - Red-Orange
* **Border:** `#DBDBDB` - Light Gray

### Typography

* **Logo:** 28px, Bold
* **Username:** 14-16px, SemiBold
* **Caption and Likes:** 14px, Regular
* **Small Text:** 10-13px, Regular

## Data Structure

The application uses local dummy data to display stories, posts, and profile information.

### Stories Data

```javascript
const stories = [
  {
    id: '1',
    name: 'Your Story',
    image: require('./path'),
    isYourStory: true,
  },
  // Additional stories
];
```

### Posts Data

```javascript
const posts = [
  {
    id: '1',
    username: 'john_doe',
    location: 'New York, USA',
    profileImage: require('./path'),
    postImage: require('./path'),
    likes: 2350,
    caption: 'Beautiful sunset today!',
    comments: 25,
    time: '3 hours ago',
  },
  // Additional posts
];
```

### Profile Data

```javascript
const profile = {
  username: 'marjan_dev',
  fullName: 'Marjan Yousafzai',
  bio: 'React Native Developer\nBuilding mobile apps',
  website: 'www.example.com',
  profileImage: require('./path'),
  posts: 150,
  followers: '10.5K',
  following: 420,
};
```

## Customization

### Adding More Stories

Add new story objects to the `stories` array. Each story should have a unique ID, username, and image.

### Adding More Posts

Add new post objects to the `posts` array using the existing post data structure.

### Changing Profile Information

Update the `profile` object to change the username, name, bio, website, profile image, and statistics.

### Adding Images

1. Place your image files inside the `assets/images/` folder.
2. Reference the images using the `require()` function.

Example:

```javascript
require('../assets/images/filename.jpg')
```

## Code Features

### Reusable Components

The application is structured using reusable React Native components, including:

* **StoryItem** - Displays an individual story
* **PostCard** - Displays a complete post
* **HighlightItem** - Displays a story highlight
* **GridItem** - Displays an individual profile grid image
* **StoryView** - Displays the full-screen story viewer

### React Native Concepts Used

* `View`
* `Text`
* `Image`
* `SafeAreaView`
* `ScrollView`
* `FlatList`
* `TouchableOpacity`
* `StyleSheet`
* `Dimensions API`
* `Animated API`
* `Modal`
* React Hooks
* Reusable Components

## Performance Considerations

The application follows several practices to improve performance and maintainability:

* Uses `FlatList` for efficient list rendering
* Uses reusable components to reduce code duplication
* Uses `useRef` for managing animation references
* Uses appropriate keys for list items
* Uses responsive dimensions for different screen sizes
* Organizes images and assets in a dedicated directory

## Contributing

Contributions are welcome. To contribute to this project:

1. Fork the repository
2. Create a new feature branch:

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes:

```bash
git commit -m "Add some AmazingFeature"
```

4. Push the branch:

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Author

### Marjan Yousafzai

* **GitHub:** [Yousafzai05](https://github.com/yousafzai05)
* **LinkedIn:** [Marjan Yousafzai](https://linkedin.com/in/marjan-yousafzai)
* **Email:** [yousafzaimarjan05@gmail.com](mailto:yousafzaimarjan05@gmail.com)

## Acknowledgments

* Instagram for the design inspiration
* React Native and Expo communities for development tools and resources
* Open-source contributors and developers

## Project Status

* Feed Screen - Complete
* Profile Screen - Complete
* Story Viewer - Complete
* Interactive Features - Complete
* Responsive Design - Complete
* Animations - Complete

## Future Enhancements

* Add dark mode support
* Implement camera functionality
* Add image upload functionality
* Implement real-time notifications
* Add comments section
* Implement search functionality
* Add direct messaging
* Add Reels functionality
* Add tagged posts functionality
* Connect the application to a backend API

## Download and Test

### 1. Clone the Repository

```bash
git clone https://github.com/yousafzai/instagramUI.git
```

### 2. Open the Project Directory

```bash
cd instagramUI
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Application

```bash
npm start
```

### 5. Test on a Physical Device

* Install the Expo Go application on your Android or iOS device
* Make sure your computer and mobile device are connected to the same network
* Scan the QR code displayed in the terminal or Expo development interface
* Open the application in Expo Go
* Start exploring the Instagram UI Clone

---

<div align="center">

Developed by **Marjan Yousafzai**

</div>
