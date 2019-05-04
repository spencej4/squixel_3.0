import React, { Component } from 'react';
import './App.css';
import Unsplash from 'unsplash-js';
import Header from './app/components/header';
import SignInPage from './app/components/signInPage';
import Landing from './app/components/landing';
import Loading from './app/components/loading';
import FullScreen from './app/components/fullscreen';
import Footer from './app/components/footer';
import Wrapper from './app/components/wrapper';
// import CenteredSearchBar from './app/components/centeredSearchBar';

const unsplash = new Unsplash({
  applicationId: "923e03b3d8e1b91345512fe194223858801d195497f62ccbc83d4b21fe8620ee",
  secret: "758ab9e393d801809a873282179ccfc6791f243d108bf0525a09a73261abd443",
  callbackUrl: "https://localhost:3000"
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // new
      showSignInPage: false,
      showRegisterPage: false,
      loginMenuVisible: false,
      email: '',
      password: '',
      // end new
      data: '',
      nextData: [],
      imagesArrrayNext: [],
      loading: false,
      showCard: false,
      showSearchInput: false,
      value: '',
      signInValue: '',
      pageNum: 0,
      showFullScreenImage: false,
      fullScreenImage: '',
      fullscreenData: '',
      showFooter: false,
      showInputInHeader: false,
      inputValueInHeader: ''
    }
    this.onSignInClick = this.onSignInClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.toggleLoginMenu = this.toggleLoginMenu.bind(this);
    this.handleSignInChange = this.handleSignInChange.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onCloseSearchClick = this.onCloseSearchClick.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.showFullScreenImage = this.showFullScreenImage.bind(this);
    this.closeFullScreenImage = this.closeFullScreenImage.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onPreviousClick = this.onPreviousClick.bind(this);
  }
// handles click for sign in from header 
  onSignInClick() {
    this.setState({
      showSignInPage: true,
      showCard: false
    })
    this.toggleLoginMenu();
  }

// handles click for register from header
 onRegisterClick() {
    alert('register clicked');
    this.setState({
      showRegisterPage: true
    })
 }

 // toggles the menu
 toggleLoginMenu() {
    let loginMenu = document.getElementById('dd-login-menu');
    
    if (this.state.loginMenuVisible === false) {
        this.setState({
            loginMenuVisible: true
        })
        loginMenu.classList.remove('hide');
        loginMenu.classList.add('show');
    }
    else if (this.state.loginMenuVisible === true) {
        this.setState({
            loginMenuVisible: false
        })
        loginMenu.classList.remove('show');
        loginMenu.classList.add('hide');
    } 
}

//sets state to input value of search field 
handleSignInChange(event) {
    this.setState({ [event.target.name]: event.target.value });
}

onSignInSubmit(event) {
    event.preventDefault();
    alert(`Email: ${this.state.email}`);
    alert(`Password: ${this.state.password}`);
}


//captures input search value, calls API and returns JSON data
  onInputSubmit(event) {
      event.preventDefault();

      this.setState({
          loading: true,
          showSearchInput: false,
          pageNum: 0,
          showCard: true, 
          showInputInHeader: true,
          showFooter: false,
      });
      unsplash.search.photos(`${this.state.value}`, `${this.state.pageNum}` , 30) 
        .then(response => response.json())
        .then(json => this.setState((prevState) => {
          // console.log('api call made');
          // console.log(json.results);
          return {
            data: json.results,
            loading: false,
            showFooter: true,
            pageNum: this.state.pageNum + 1
          }
        }))
        .catch((error) => {
          this.setState((prevState) => {
            return {
              loading: false,
              error: 'Error when retrieving'
            }
          });
        });
  }

//user clicks next, calls API and returns JSON data
  onNextClick() {
      this.setState({
        loading: true,
        showSearchInput: false,
        showFooter: false
      });
      unsplash.search.photos(`${this.state.value}`, `${this.state.pageNum + 1}`, 30)
        .then(response => response.json())
        .then(json => this.setState((prevState) => {
          return {
            showSearchInput: false,
            data: json.results,
            loading: false,
            showFooter: true,
            showCard: true,
            pageNum: this.state.pageNum + 1
          }
        }))
        .catch((error) => {
          this.setState((prevState) => {
            return {
              loading: false,
              error: 'Error when retrieving'
            }
          });
        });
  }
  
//user clicks previous, calls API and returns JSON data
  onPreviousClick() {
      this.setState({
        loading: true,
        showSearchInput: false,
        showFooter: false
      });
      unsplash.search.photos(`${this.state.value}`, `${this.state.pageNum - 1}`, 30)
        .then(response => response.json())
        .then(json => this.setState((prevState) => {
          return {
            showSearchInput: false,
            data: json.results,
            loading: false,
            showFooter: true,
            showCard: true,
            pageNum: this.state.pageNum - 1
          }
        }))
        .catch((error) => {
          this.setState((prevState) => {
            return {
              loading: false,
              error: 'Error when retrieving'
            }
          });
        });
  }
  
  onSearchClick() {
    this.setState({
      showSearchInput: true
    });
  }

  onCloseSearchClick() {
    this.setState({
      showSearchInput: false
    })
  }

  closeSearch () {
    this.setState ({
      showSearchInput: false
    })
  }

  //sets state to input value of search field 
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  showFullScreenImage(image, fullscreenData, ) {
    this.setState({
      showFullScreenImage: true,
      fullScreenImage: image,
      fullscreenData: fullscreenData
    })
  }

  closeFullScreenImage() {
    this.setState({
      showFullScreenImage: false,
      fullScreenImage: ''
    })
  }

  render() {
    return (
      <div className="App">
        <Header 
          onSignInClick={this.onSignInClick}
          onRegisterClick={this.onRegisterClick}
          toggleLoginMenu={this.toggleLoginMenu}
          showSignInPage={this.state.showSignInPage}
          showSearchInput={this.state.showSearchInput}
          handleChange={this.handleChange}
          onInputSubmit={this.onInputSubmit}
          onSearchClick={this.onSearchClick}
          onCloseSearchClick={this.onCloseSearchClick}
          closeSearch={this.closeSearch}
          showInputInHeader={this.state.showInputInHeader}
          inputValue = {this.state.value}
          showCard = {this.state.showCard}
        />
         {(!this.state.showCard && this.state.showSignInPage) ? ( <SignInPage 
            handleSignInChange={this.handleSignInChange}
            onSignInSubmit={this.onSignInSubmit}
         /> ) : (null)}
        {(!this.state.showCard  && !this.state.showSignInPage) ? ( <Landing /> ) : (null)}
        {this.state.loading ? ( <Loading /> ) : (null)}
        <Wrapper showCard={this.state.showCard}
          data={this.state.data}
          loading={this.state.loading}
          photos={this.state.photos}
          showFullScreen={this.state.showFullScreen}
          showFullScreenImage={this.showFullScreenImage}
          fullScreenImage={this.state.fullScreenImage}/>
        {this.state.showFullScreenImage ? (
          <FullScreen photo={this.state.fullScreenImage} 
            fullscreenData={this.state.fullscreenData}
            closeFullScreen={this.closeFullScreenImage}
          />
          ) : (null)
        }
        {this.state.showFooter ? (
          <Footer onPreviousClick={this.onPreviousClick}
            onNextClick={this.onNextClick}/>
          ) : (null)
        }
      </div>
    );
  }
}

export default App;
