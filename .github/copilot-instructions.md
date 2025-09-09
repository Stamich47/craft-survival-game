# Craft Survival Game - Development Guidelines

This is a React Native mobile crafting/survival game built with Expo for development.

## Project Overview

- **Platform**: React Native with Expo
- **Language**: TypeScript
- **State Management**: Redux Toolkit with Redux Persist
- **Game Type**: Crafting/Survival mobile game
- **Target Platforms**: iOS, Android, Web

## Architecture

- Clean component structure with separation of UI and game logic
- Redux slices for player, inventory, and crafting systems
- TypeScript interfaces for type safety
- Utility functions for game calculations
- Data-driven design with JSON configurations

## Key Features

- Resource gathering and management
- Crafting system with recipes and time-based progression
- Inventory management with grid-based UI
- Player progression with leveling system
- Survival mechanics (health, hunger, thirst, energy)
- Persistent game state with automatic save/load

## Development Standards

- Use TypeScript for all new code
- Follow React Native and Expo best practices
- Implement responsive design for mobile devices
- Use Redux Toolkit for state management
- Write clean, maintainable component code
- Include proper error handling and loading states

## Game Systems

- **Player System**: Stats, progression, experience
- **Inventory System**: Item storage, stacking, organization
- **Crafting System**: Recipe management, ingredient checking
- **Item System**: Resources, tools, weapons, consumables
- **Persistence**: Automatic save/load with Redux Persist

## UI Guidelines

- Dark theme optimized for gaming
- Touch-friendly interface elements
- Visual feedback for user interactions
- Progress bars for stats and crafting
- Grid-based inventory layout
- Smooth animations and transitions
