# Frontend Prototypage - AI Brain Interface

An adaptive React Native frontend application featuring an interactive animated robot brain visualization. This UI integrates seamlessly as both a web page and native mobile app, designed for embedded multimodal LLM AI systems.

## Features

✨ **Interactive Animated Robot Brain**
- Rotating 3D-like brain visualization
- Click to add data (increases brain fill level)
- Hold gesture to scale the brain
- Remove and reset functionality
- Dynamic neural network visualization

🎨 **Adaptive Design**
- Seamless web and native app deployment
- Responsive UI that adapts to different screen sizes
- Modern React Native with Expo framework
- Smooth animations using React Native Reanimated

🧠 **AI-Focused Interface**
- Visual representation of data loading
- Brain fills up as more code/data is added
- Pulsing animation when active
- Intuitive gesture controls

## Technology Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Universal React applications framework
- **JavaScript** - Modern ES6+ syntax
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on specific platform:
```bash
npm run web      # Web browser
npm run android  # Android device/emulator
npm run ios      # iOS device/simulator
```

## Usage

### Interactive Controls

- **Click Brain**: Adds 10% data to the brain (up to 100%)
- **Hold Brain**: Scales the brain up while holding
- **Add Data Button**: Programmatically add data
- **Reset Button**: Reset data level to 0%
- **Remove Brain Button**: Completely remove and reset the brain with animation

### Visual Feedback

- The brain rotates continuously
- Data level is shown as a percentage inside the brain
- Neural nodes appear and increase with data level
- Brain core fills up with cyan color as data increases
- Pulsing animation activates when data is present

## Project Structure

```
Frontend_prototypage/
├── App.js              # Main application component
├── app.json            # Expo configuration
├── package.json        # Dependencies and scripts
├── babel.config.js     # Babel configuration
├── assets/             # Images and icons
└── README.md           # This file
```

## Customization

### Modify Brain Appearance
Edit the styles in `App.js`:
- `brainCore`: Main brain circle
- `leftHemisphere` / `rightHemisphere`: Brain lobes
- `neuron`: Neural network nodes

### Adjust Animation Speed
Change the rotation duration in the `useEffect` hook:
```javascript
duration: 8000,  // Milliseconds for one full rotation
```

### Change Color Scheme
Update the color values in the `StyleSheet`:
- Primary: `#00ffff` (Cyan)
- Secondary: `#0088ff` (Blue)
- Background: `#0a0e27` (Dark blue)

## Platform Support

- ✅ Web (Progressive Web App)
- ✅ iOS (Native app)
- ✅ Android (Native app)

## Future Enhancements

- Real-time data integration from AI model
- Multiple brain states (thinking, processing, idle)
- Voice interaction support
- Multi-language support
- Advanced gesture controls
- Settings panel for customization

## License

MIT License - Feel free to use this in your projects!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
