import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchChannels } from '../store'
import ChannelCard from './ChannelCard'

class AllChannels extends Component {
  componentDidMount () {
    this.props.fetchChannels()
  }

  render () {
    return (
      <div style={{ margin: '0 50px' }}>
        <h1>Channels</h1>
        <div
          className='uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-child-width-1-5@l uk-grid-match uk-grid-small'
          uk-grid='true'
        >
          <div className='uk-text-center'>
            <div
              className='uk-inline-clip uk-transition-toggle uk-light'
              tabindex='0'
            >
              <img style={{ cursor: 'pointer' }} src='./assets/dj.jpg' />
              <div className='uk-position-center'>
                <span
                  className='uk-transition-fade'
                  uk-icon='icon: plus; ratio: 2'
                />
              </div>
            </div>
            <p className='uk-margin-small-top'>New Channel</p>
          </div>
          {this.props.channels.map(channel => {
            return <ChannelCard key={channel.id} channel={channel} />
          })}{' '}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.channelsObj.channels
})

const mapDispatchToProps = dispatch => ({
  fetchChannels: () => dispatch(fetchChannels())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllChannels)