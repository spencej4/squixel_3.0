import React, {Component} from 'react';
import CenteredSearchBarLanding from './CenteredSearchBarLanding';

class Landing extends Component   {
  constructor(props) {
    super(props);
    this.state = {
        isMobileDevice: false
    } 
  }

  componentWillMount() {
    if ((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)){
      // console.log('this is a mobile device');
      this.setState({
        isMobileDevice: true
      })
    }else {
      // console.log('this is a desktop');
      this.setState({
        isMobileDevice: false
      })
    }
  }


  render () {
      return (
          <div className='landing'>
            <div className='landing-overlay'>
            {/* owns background image */}
            <div className='landing-message'>
              <div className='landing-logo'>
                <h1 className='landing-logo'>Squixel</h1>
              </div>
              <div className='landing-text'>
                <p>The creative source for inspiration.
                    <br></br>
                    Powered by your imagination.</p>
              </div>
              {(!this.state.isMobileDevice) ? ( 
                <div className='landing-search-bar'>
                  <CenteredSearchBarLanding
                    handleChange={(e) => this.props.handleChange(e)}
                    onInputSubmit={(e) => this.props.onInputSubmit(e)}
                  ></CenteredSearchBarLanding>
                </div>
              ) : <null></null>}
            </div>
          </div>
        </div>
      )
  }
}

export default Landing