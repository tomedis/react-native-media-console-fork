import React, {memo} from 'react';
import {
  Animated,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  GestureResponderHandlers,
  Text,
} from 'react-native';
import {Volume} from './Volume';
import {Back} from './Back';
import {NullControl} from './NullControl';
import {styles} from './styles';
import type {VideoAnimations} from '../types';

interface TopControlProps {
  showControls: boolean;
  panHandlers: GestureResponderHandlers;
  animations: VideoAnimations;
  disableBack: boolean;
  disableVolume: boolean;
  volumeFillWidth: number;
  volumeTrackWidth: number;
  volumePosition: number;
  onBack: () => void;
  resetControlTimeout: () => void;
  textHeader?: string;
}

export const TopControls = memo(
  ({
    showControls,
    panHandlers,
    animations,
    disableBack,
    disableVolume,
    volumeFillWidth,
    volumePosition,
    volumeTrackWidth,
    onBack,
    resetControlTimeout,
    textHeader,
  }: TopControlProps) => {
    const backControl = disableBack ? (
      <NullControl />
    ) : (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Back
          showControls={showControls}
          onBack={onBack}
          resetControlTimeout={resetControlTimeout}
        />
        {
          !!textHeader && (
            <Text style={{ color: '#d6d6d6', fontSize: 19, marginLeft: 10 }} numberOfLines={1}>{textHeader}</Text>
          )
        }
      </View>
    );

    const volumeControl = disableVolume ? (
      <NullControl />
    ) : (
      <Volume
        volumeFillWidth={volumeFillWidth}
        volumeTrackWidth={volumeTrackWidth}
        volumePosition={volumePosition}
        volumePanHandlers={panHandlers}
      />
    );

    return (
      <Animated.View
        style={[
          _styles.top,
          {
            opacity: animations.controlsOpacity,
            marginTop: animations.topControl.marginTop,
          },
        ]}>
        <ImageBackground
          source={require('../assets/img/top-vignette.png')}
          style={[styles.column]}
          imageStyle={[styles.vignette]}>
          <SafeAreaView style={_styles.topControlGroup}>
            {backControl}
            <View style={_styles.pullRight}>{volumeControl}</View>
          </SafeAreaView>
        </ImageBackground>
      </Animated.View>
    );
  },
);

const _styles = StyleSheet.create({
  pullRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  topControlGroup: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 12,
    marginBottom: 18,
  },
});
