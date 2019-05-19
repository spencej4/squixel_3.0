import React, { Component } from 'react';
import './App.css';
import Unsplash from 'unsplash-js';
import Header from './app/components/header';
import SignInPage from './app/components/signInPage';
import RegisterPage from './app/components/registerPage';
import Landing from './app/components/landing';
import Loading from './app/components/loading';
import FullScreen from './app/components/fullscreen';
// import Footer from './app/components/footer';
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
      showSignInPage: false,
      showRegisterPage: false,
      loginMenuVisible: false,
      log_email: '',
      log_password: '',
      isAuthenticated: false,
      isRegistered: false,
      data: '',
      nextData: [],
      imagesArrrayNext: [],
      loading: false,
      showCard: false,
      userCollectionData: '',
      userCardLoading: false, 
      showUserCard: false,
      showSearchInput: false,
      value: '',
      signInValue: '',
      pageNum: 0,
      showFullScreenImage: false,
      fullScreenImage: '',
      fullscreenDataID: '',
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
    this.setCookie = this.setCookie.bind(this);
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
    this.scrollWindow = this.scrollWindow.bind(this);
  }

componentWillMount() {
  this.checkCookie();
}


componentDidMount() {
 // 
}

scrollWindow() {
  window.scrollTo(0, 0);
}

// handles click for sign in from header 
onSignInMenuClick() {
  this.scrollWindow()
  this.setState({
    showSignInPage: true,
    showRegisterPage: false,
    showCard: false,
    showFooter: false,
    showInputInHeader: false
  })
  this.toggleLoginMenu();
}


// handles click for register from header
onRegisterMenuClick() {
  this.scrollWindow()
  this.setState({
    showSignInPage: false,
    showRegisterPage: true,
    showCard: false,
    showFooter: false,
    showInputInHeader: false
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


//sets state to input value of sign-in/ register fields
handleSignInChange(event) {
  event.preventDefault();
  this.setState({ 
    [event.target.name]: event.target.value 
  });
}


// logs in a user
onLoginSubmit(event) {
  this.scrollWindow();

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
      return response.json();
    }).then(function(data){
      this.setState({
        isAuthenticated: true
      })
    }.bind(this));

    // calls setCookie function
    this.setCookie('username', this.state.log_email, 30)
}


// create a user cookie
setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


// retrieve a cookie
getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


// verify a cookie
checkCookie() {
  var user= this.getCookie("username");
  if (user !== "") {
    // updates state that user is logged in and set log_email value to user
    this.setState({
      isAuthenticated: true,
      log_email: user
    })
  } else {
    // user is not logged in, no cookie found
  }
}


// registers user
onRegisterSubmit(event) {
    event.preventDefault();

    // confirms that user typed same password twice
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
        }).then(function(response){
          return response.json();
        }).then(function(data){
          this.setState({ 
            isRegistered: true 
          });
        }.bind(this));
    }
}

// logs user out
onLogoutClick() {
  // sets current cookie to expired
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  this.setState({
    isAuthenticated: false,
    log_email: '',
    showUserCard: false
  }) 
  this.toggleLoginMenu();
}


// toggle from register page to login page and vice versus
toggleLoginPage() {
  this.scrollWindow();

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


// retrieves and displays user photo collection
onViewCollectionClick() {
  this.toggleLoginMenu();
  let user = this.state.log_email

  this.setState({
    userCardLoading: true,
    pageNum: 0,
    showCard: false, 
    userCollectionData: ''
  });

  fetch('/api/getUserContent/' + user,{
      method: 'GET',
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      credentials: "same-origin",
  })
  .then(response => response.json())
  // get returned images from user's database
  .then(response => {
      //iterate through return for images
      for (var index in response) {
        this.setState({
          // push each image to state array
          userCollectionData:  [...this.state.userCollectionData, 
            {image: response[index].image, 
             smallImage: response[index].smallImage}
          ]
        })
      }
  }).then(response => this.setState((prevState) => {
        return {
          userCardLoading: false,
          showUserCard: true,
          showSignInPage: false,
          showFooter: false,
          showInputInHeader: false
        } 
  }))
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
  event.preventDefault();
  this.setState({
    value: event.target.value
  });
}


showFullScreenImage(image, smallImage, fullscreenDataID) {
  this.setState({
    showFullScreenImage: true,
    fullScreenImage: image,
    smallImage: smallImage,
    fullscreenDataID: fullscreenDataID
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
            showUserCard = {this.state.showUserCard}
        />
         {(!this.state.showCard && !this.state.showUserCard && this.state.showSignInPage) ? (
            <SignInPage 
              toggleLoginPage= {this.toggleLoginPage}
              handleSignInChange={this.handleSignInChange}
              onLoginSubmit={this.onLoginSubmit}
              isAuthenticated={this.state.isAuthenticated}
         /> ) : (null)}
         {(!this.state.showCard && !this.state.showUserCard && this.state.showRegisterPage) ? ( 
            <RegisterPage 
              toggleLoginPage={this.toggleLoginPage}
              handleSignInChange={this.handleSignInChange}
              onRegisterSubmit={this.onRegisterSubmit}
              isRegistered={this.state.isRegistered}
         /> ) : (null)}
        {(!this.state.showCard  && !this.state.showUserCard && !this.state.showSignInPage && !this.state.showRegisterPage ) ? ( 
            <Landing /> 
        ) : (null)}
        {this.state.loading ? ( <Loading /> ) : (null)}
            <Wrapper 
              isAuthenticated={this.state.isAuthenticated}
              showSignInPage={this.state.showSignInPage}
              showCard={this.state.showCard}
              data={this.state.data}
              loading={this.state.loading}
              userCollectionData={this.state.userCollectionData}
              showUserCard={this.state.showUserCard}
              userCardLoading={this.state.userCardLoading}
              photos={this.state.photos}
              showFullScreen={this.state.showFullScreen}
              showFullScreenImage={this.showFullScreenImage}
              fullScreenImage={this.state.fullScreenImage}
              showFooter={this.state.showFooter}
              onPreviousClick={this.onPreviousClick}
              onNextClick={this.onNextClick}
            />
        {this.state.showFullScreenImage ? (
            <FullScreen 
              isAuthenticated={this.state.isAuthenticated}
              photo={this.state.fullScreenImage} 
              smallImage={this.state.smallImage}
              fullscreenDataID={this.state.fullscreenDataID}
              closeFullScreen={this.closeFullScreenImage}
              log_email={this.state.log_email}
            />
        ) : (null)}
      </div>
    );
  }
}

export default App;
