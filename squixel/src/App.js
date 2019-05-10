import React, { Component } from 'react';
import './App.css';
import Unsplash from 'unsplash-js';
import Header from './app/components/header';
import SignInPage from './app/components/signInPage';
import RegisterPage from './app/components/registerPage';
import Landing from './app/components/landing';
import Loading from './app/components/loading';
import FullScreen from './app/components/fullscreen';
import Footer from './app/components/footer';
import Wrapper from './app/components/wrapper';

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
      // email: '',
      // password: '',
      // end new
      log_email: '',
      log_password: '',
      isAuthenticated: false,
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
    this.onSignInMenuClick = this.onSignInMenuClick.bind(this);
    this.onRegisterMenuClick = this.onRegisterMenuClick.bind(this);
    this.toggleLoginMenu = this.toggleLoginMenu.bind(this);
    this.toggleLoginPage = this.toggleLoginPage.bind(this);
    this.handleSignInChange = this.handleSignInChange.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.onViewCollectionClick = this.onViewCollectionClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
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

componentDidMount() {
  // let localStorageKey = localStorage.getItem("key");

  // // check if user is logged in via local storage
  // if (this.state.isAuthenticated && localStorageKey) {
  //   console.log(`Local Storage Key: ${localStorageKey}`)
  //   // update state that user is logged in
  //   this.setState({
  //     isAuthenticated: true
  //   })
  // }else {
  //   console.log('no local storage key found');
  // }
}

// handles click for sign in from header 
onSignInMenuClick() {
  this.setState({
    showSignInPage: true,
    showRegisterPage: false,
    showCard: false
  })
  this.toggleLoginMenu();
}


// handles click for register from header
onRegisterMenuClick() {
  this.setState({
    showSignInPage: false,
    showRegisterPage: true,
    showCard: false
  })
  this.toggleLoginMenu();
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


onLoginSubmit(event) {
  event.preventDefault();
  fetch('/api/login',{
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
        credentials: "same-origin",
        body: JSON.stringify({
          email: this.state.log_email,
          password: this.state.log_password
        }) 
    }).then(function(response){
      console.log(`You're signed in! ${this.state.log_email}`);

      //update state
      this.setState({
        isAuthenticated: true
      })

    }.bind(this));
}


onRegisterSubmit(event) {
    event.preventDefault();

    // confirm that user typed same password twice
    if (this.state.password !== this.state.password_confirm) {
      alert("The passwords doesn't match")
    } else {
        fetch('/api/register',{
              method: 'POST',
              mode: "cors",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                password_confirm: this.state.password_confirm,
                content: []
              }) 
        }).then(function(){
          // this.setState({ displayForm: false });
        });
    }
}


onViewCollectionClick() {
  console.log('view collection clicked');
  this.toggleLoginMenu();

  fetch('/api/getUserContent',{
      method: 'POST',
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      credentials: "same-origin",
      body: JSON.stringify({
        email: this.state.log_email,
        password: this.state.log_password
      }) 
  }).then(response => response.json())
    .then(data => {
        console.log(data)
  })
  // .then(function(response){
  //     // console.log(JSON.stringify(response));
  //     console.log(response);
  // });
}


onLogoutClick() {
  console.log('logout clicked');
  this.setState({
    isAuthenticated: false
  }) 
  this.toggleLoginMenu();
}


// toggle from register page to login page and vice versus
toggleLoginPage() {
  if (this.state.showSignInPage) {
    this.setState({
      showSignInPage: false,
      showRegisterPage: true
    })
  }else if (this.state.showRegisterPage) {
    this.setState({
      showSignInPage: true,
      showRegisterPage: false
    })
  }
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
          onSignInMenuClick={this.onSignInMenuClick}
          onRegisterMenuClick={this.onRegisterMenuClick}
          toggleLoginMenu={this.toggleLoginMenu}
          showSignInPage={this.state.showSignInPage}
          showRegisterPage={this.state.showRegisterPage}
          isAuthenticated={this.state.isAuthenticated}
          onViewCollectionClick={this.onViewCollectionClick}
          onLogoutClick={this.onLogoutClick}
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
            toggleLoginPage= {this.toggleLoginPage}
            handleSignInChange={this.handleSignInChange}
            onLoginSubmit={this.onLoginSubmit}
         /> ) : (null)}
         {(!this.state.showCard && this.state.showRegisterPage) ? ( <RegisterPage 
            toggleLoginPage= {this.toggleLoginPage}
            handleSignInChange={this.handleSignInChange}
            onRegisterSubmit={this.onRegisterSubmit}
         /> ) : (null)}
        {(!this.state.showCard  && !this.state.showSignInPage && !this.state.showRegisterPage) ? ( <Landing /> ) : (null)}
        {this.state.loading ? ( <Loading /> ) : (null)}
        <Wrapper showCard={this.state.showCard}
          data={this.state.data}
          loading={this.state.loading}
          photos={this.state.photos}
          showFullScreen={this.state.showFullScreen}
          showFullScreenImage={this.showFullScreenImage}
          fullScreenImage={this.state.fullScreenImage}/>
        {this.state.showFullScreenImage ? (
          <FullScreen 
            photo={this.state.fullScreenImage} 
            fullscreenData={this.state.fullscreenData}
            closeFullScreen={this.closeFullScreenImage}
            log_email={this.state.log_email}
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
