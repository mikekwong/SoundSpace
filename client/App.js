import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Landing from './components/Landing'
import Oauth from './components/Oauth'
import UserInfo from './components/UserInfo'
import ChannelView from './components/ChannelView'
import AllChannels from './components/AllChannels'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'
import { getMe } from './store/user'
// import { setPlayer } from './store/player'
// import { checkForPlayer, createEventHandlers,  } from './EmbedPlayer'

class App extends React.Component {
  // constructor() {
    // super()
    // this.checkForPlayer = checkForPlayer.bind(this)
    // this.createEventHandlers = createEventHandlers.bind(this)
    // this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 200)
  // }
  
  componentDidMount() {
    this.props.getUser()
  }
  
  render() {
    if(!this.props.user.id) return <Landing />
    return (
      <div>
        <nav>
          <Navbar />
        </nav>
        <main>
        <Switch>
          <Redirect from='/channels/redirect/:id' to='/channels/:id'/>
          <Route exact path='/channels' component={AllChannels} />
          <Route path='/channels/:id' component={ChannelView} />
          {/* <Route path='/home' component={UserInfo} /> */}
          {/* <Route path='/login' component={Oauth} /> */}
          <Route exact path='/' component={Landing} />
        </Switch>
          {/* <Route component={Routes} /> */}
        </main>
      </div>
    )
  }
}

// const Routes = props => (
//   <Switch>
//     <Route exact path='/channels' component={AllChannels} />
//     <Route path='/channels/:id' component={ChannelView} />
//     <Route path='/home' component={UserInfo} />
//     <Route path='/login' component={Oauth} />
//     <Route exact path='/' component={Landing} />
//   </Switch>
// )

function mapState(state) {
  return {
    user: state.userObj,
  }
}

function mapDispatch(dispatch) {
  return {
   getUser() {
     dispatch(getMe())
   }
  }
}

export default connect(mapState, mapDispatch)(App)
