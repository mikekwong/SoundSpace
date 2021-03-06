import React, { Component } from 'react';
import AudioBar from './AudioBar';

export default class AudioViz extends Component {
  render() {
    if (!this.props.vizData) {
      return null;
    }
    const { vizData, currentSegment } = this.props;
    if (vizData.length <= currentSegment) {
      return null;
    }
    return (
      <div id="audio-viz">
        {vizData[currentSegment].pitches.map((pitch, idx) => (
          <div key={idx}>
            <AudioBar pitch={pitch} idx={idx} audioVizColors={this.props.audioVizColors} />
          </div>
        ))}
      </div>
    );
  }
}
