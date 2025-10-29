import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  PanResponder,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [dataLevel, setDataLevel] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [brainVisible, setBrainVisible] = useState(true);
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Rotation animation
  useEffect(() => {
    const rotation = Animated.loop(
      Animated.timing(rotationAnim, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    rotation.start();
    return () => rotation.stop();
  }, []);

  // Pulse animation when data is added
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    if (dataLevel > 0) {
      pulse.start();
    }
    return () => pulse.stop();
  }, [dataLevel]);

  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Pan responder for gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setIsHolding(true);
        Animated.spring(scaleAnim, {
          toValue: 1.2,
          friction: 3,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderRelease: () => {
        setIsHolding(false);
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const handleClick = () => {
    if (dataLevel < 100) {
      setDataLevel(prev => Math.min(prev + 10, 100));
    }
  };

  const handleRemove = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setBrainVisible(false);
      setTimeout(() => {
        setBrainVisible(true);
        setDataLevel(0);
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }).start();
      }, 500);
    });
  };

  const handleReset = () => {
    setDataLevel(0);
  };

  // Generate brain neurons based on data level
  const renderNeurons = () => {
    const neuronCount = Math.floor((dataLevel / 100) * 20);
    const neurons = [];
    for (let i = 0; i < neuronCount; i++) {
      const angle = (i / neuronCount) * Math.PI * 2;
      const radius = 60 + Math.random() * 20;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      neurons.push(
        <View
          key={i}
          style={[
            styles.neuron,
            {
              left: x + 100,
              top: y + 100,
              opacity: 0.5 + Math.random() * 0.5,
            },
          ]}
        />
      );
    }
    return neurons;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.title}>AI Brain Interface</Text>
        <Text style={styles.subtitle}>
          Embedded Multimodal LLM AI - Adaptive Frontend
        </Text>
      </View>

      <View style={styles.brainContainer}>
        {brainVisible && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.brain,
              {
                transform: [
                  { rotate: spin },
                  { scale: Animated.multiply(scaleAnim, pulseAnim) },
                ],
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleClick}
              style={styles.brainTouch}
            >
              {/* Brain Core */}
              <View style={styles.brainCore}>
                <View
                  style={[
                    styles.dataFill,
                    { height: `${dataLevel}%` },
                  ]}
                />
              </View>

              {/* Brain Hemispheres */}
              <View style={styles.leftHemisphere}>
                <View
                  style={[
                    styles.hemisphereData,
                    { opacity: dataLevel / 200 },
                  ]}
                />
              </View>
              <View style={styles.rightHemisphere}>
                <View
                  style={[
                    styles.hemisphereData,
                    { opacity: dataLevel / 200 },
                  ]}
                />
              </View>

              {/* Neural Network Visualization */}
              <View style={styles.neuralNetwork}>{renderNeurons()}</View>

              {/* Brain Text */}
              <View style={styles.brainTextContainer}>
                <Text style={styles.brainText}>AI</Text>
                <Text style={styles.dataLevelText}>{dataLevel}%</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}

        {isHolding && (
          <Text style={styles.holdingText}>Holding Brain...</Text>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Add Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonDanger]}
          onPress={handleRemove}
        >
          <Text style={styles.buttonText}>Remove Brain</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          • Click brain to add data (+10%)
        </Text>
        <Text style={styles.infoText}>
          • Hold to scale brain
        </Text>
        <Text style={styles.infoText}>
          • Remove brain to reset completely
        </Text>
        <Text style={styles.infoText}>
          Platform: {Platform.OS === 'web' ? 'Web' : 'Native'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 8,
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#88ccff',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  brainContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  brain: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainTouch: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brainCore: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1a1f3a',
    borderWidth: 3,
    borderColor: '#00ffff',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  dataFill: {
    width: '100%',
    backgroundColor: '#00ffff',
    opacity: 0.3,
  },
  leftHemisphere: {
    position: 'absolute',
    left: -10,
    width: 80,
    height: 140,
    borderRadius: 40,
    backgroundColor: '#1a1f3a',
    borderWidth: 2,
    borderColor: '#0088ff',
    overflow: 'hidden',
    shadowColor: '#0088ff',
    shadowOffset: { width: -5, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  rightHemisphere: {
    position: 'absolute',
    right: -10,
    width: 80,
    height: 140,
    borderRadius: 40,
    backgroundColor: '#1a1f3a',
    borderWidth: 2,
    borderColor: '#0088ff',
    overflow: 'hidden',
    shadowColor: '#0088ff',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  hemisphereData: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0088ff',
  },
  neuralNetwork: {
    position: 'absolute',
    width: 200,
    height: 200,
  },
  neuron: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  brainTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  brainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffff',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  dataLevelText: {
    fontSize: 16,
    color: '#88ccff',
    marginTop: 4,
  },
  holdingText: {
    position: 'absolute',
    bottom: -30,
    color: '#00ffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#0088ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 5,
    shadowColor: '#0088ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: '#ff8800',
    shadowColor: '#ff8800',
  },
  buttonDanger: {
    backgroundColor: '#ff0044',
    shadowColor: '#ff0044',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  info: {
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  infoText: {
    color: '#88ccff',
    fontSize: 12,
    marginVertical: 2,
    textAlign: 'center',
  },
});
