import React, { Component } from 'react';
import axios from 'axios';
import createClientSocket from 'socket.io-client';
import { connect } from 'react-redux';
import '../styles/ChannelViewStyles.css';
import ChannelSideBar from "./ChannelSideBar"
import {
  transferPlaybackHere,
  checkForPlayer,
  createEventHandlers,
  setTrack,
  stopPlayer,
} from '../EmbedPlayer';
const IP = 'http://localhost:8080';

class ChannelView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: false,
      currentSongId: '',
      device_id: '',
      showChannelsBar: false
    };
    this.socket = createClientSocket(IP)
    this.stopPlayer = stopPlayer.bind(this)
    this.setTrack = setTrack.bind(this)
    this.transferPlaybackHere = transferPlaybackHere.bind(this)
    this.checkForPlayer = checkForPlayer.bind(this);
    this.createEventHandlers = createEventHandlers.bind(this)
    this.player = this.props.player
  }

  componentDidMount() {
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }

  componentWillUnmount() {
    //If navigating away from ChannelView, disconnect from socket and stop player
    this.socket.emit('leave', this.props.match.params.id);
    this.stopPlayer();
  }

  showChannelsBar = () => {
    this.setState({showChannelsBar: !this.state.showChannelsBar})
  };

  vote = async userVote => {
    if (this.state.voted) return;
    try {
      await axios.put(`api/channels/${this.props.match.params.id}/votes`, {
        vote: userVote,
      });
      this.setState({
        voted: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="channel-view-container">
        {this.state.showChannelsBar && <ChannelSideBar/>}
        <button className="uk-button uk-button-primary" onClick={this.showChannelsBar}>ShowChannels</button>
        <h1>This is the Channel {this.props.match.params.id}</h1>
        <h2>Current Song: {this.state.currentSongId || 'None'}</h2>

        <div className="vote-button-container">
          <button onClick={() => this.vote(1)}>Upvote!</button>
          <button onClick={() => this.vote(-1)}>Downvote!</button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.userObj.user,
    player: state.playerObj
  };
};

export default connect(
  mapState,
  null
)(ChannelView);
