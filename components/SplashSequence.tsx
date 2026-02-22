import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

const splashImages = [
  require("./../assets/images/splash1.jpg"),
  require("./../assets/images/splash2.jpg"),
  require("./../assets/images/splash3.webp"),
];

interface SplashSequenceProps {
  onFinish: () => void;
  duration?: number;
}

const SplashSequence: React.FC<SplashSequenceProps> = ({
  onFinish,
  duration = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < splashImages.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onFinish();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, duration, onFinish]);

  return (
    <View style={styles.container}>
      <Image source={splashImages[currentIndex]} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: height,
    resizeMode: "contain",
  },
});

export default SplashSequence;
