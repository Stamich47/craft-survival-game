# Craft Survival Game

A React Native mobile crafting/survival game built with Expo for rapid development and cross-platform deployment.

## 🎮 Game Overview

This is a mobile crafting and survival game where players must gather resources, craft tools and items, manage their health and survival needs, and progress through increasingly challenging gameplay.

### Core Features

- **Resource Management**: Gather wood, stone, iron ore, and other materials
- **Crafting System**: Create tools, weapons, and useful items from recipes
- **Survival Mechanics**: Manage health, hunger, thirst, and energy
- **Player Progression**: Level up and unlock new crafting recipes
- **Inventory Management**: Organize and store items in a grid-based inventory
- **Persistent Game State**: Automatic save/load using Redux Persist

## 🛠️ Technology Stack

- **React Native** with **Expo** for mobile development
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **Redux Persist** for data persistence
- **React Native Reanimated** for smooth animations
- **Expo Linear Gradient** for visual effects
- **Expo modules** for native device features

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Generic UI components (Button, ProgressBar, etc.)
│   └── game/           # Game-specific components
├── screens/            # App screens
├── store/              # Redux store configuration
│   ├── playerSlice.ts  # Player state management
│   ├── inventorySlice.ts # Inventory management
│   └── craftingSlice.ts # Crafting system
├── types/              # TypeScript type definitions
├── data/               # Game data (items, recipes)
├── utils/              # Utility functions
└── systems/            # Game systems (future use)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. Run on your preferred platform:
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` to run in browser

### Development Commands

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator (Mac only)
- `npm run web` - Run web version

## 🎯 Game Mechanics

### Player Stats

- **Health**: Player's life points
- **Hunger**: Decreases over time, affects health
- **Thirst**: Must be maintained for survival
- **Energy**: Required for actions, recovered by resting

### Crafting System

- Discover recipes by reaching required levels
- Gather ingredients from the world
- Craft items at different crafting stations
- Time-based crafting with progress tracking

### Items & Resources

- **Resources**: Wood, Stone, Iron Ore, Berries, Water
- **Tools**: Axes, Pickaxes for gathering
- **Weapons**: Swords for combat (future feature)
- **Craftables**: Processed materials for advanced items

## 🔧 Development Features

### VS Code Extensions Included

- React Native Tools
- Expo Tools
- ES7+ React/Redux/React-Native snippets (pre-installed)
- Prettier - Code formatter (pre-installed)
- GitHub Copilot (pre-installed)

### Code Quality

- TypeScript for type safety
- ESLint configuration
- Prettier for code formatting
- Structured component architecture

## 🚧 Future Enhancements

### Planned Features

- World exploration and map system
- Combat with enemies and wildlife
- Building and base construction
- Multiplayer gameplay
- Quests and storyline
- Advanced crafting stations
- Weather and day/night cycle
- Save slots and multiple characters

### Technical Improvements

- Unit tests with Jest
- E2E testing with Detox
- Performance optimization
- Audio system integration
- Push notifications
- Offline-first architecture

## 📱 Game Controls

- **Tap**: Select inventory items or crafting recipes
- **Swipe**: Navigate between inventory and crafting screens
- **Press and Hold**: View item details (planned)

## 🛡️ State Management

The game uses Redux Toolkit with the following slices:

- **Player Slice**: Character stats, level, experience
- **Inventory Slice**: Item storage and management
- **Crafting Slice**: Recipe discovery and crafting progress

All game state is automatically persisted using Redux Persist and AsyncStorage.

## 🎨 UI Design

- Dark theme optimized for mobile gaming
- Touch-friendly interface elements
- Visual progress indicators
- Smooth animations and transitions
- Responsive layout for different screen sizes

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Happy Crafting and Surviving!** 🏕️⚔️🛠️
