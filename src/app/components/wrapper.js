import React, { Component } from 'react';
import Card from './card';
import UserCard from './userCard';
import Footer from './footer';

class Wrapper extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

    render() {
      // if no data (due to no results from search), don't render Wrapper
      if ((this.props.data.length === 0) && (!this.props.showUserCard)) {
        return (
          null
        )
      } else {
      return (
        <div className='body-container'>
          {this.props.showCard ? (
            <div className='wrapperDiv'>
              <Card 
                  isAuthenticated={this.props.isAuthenticated}
                  data={this.props.data}
                  loading={this.props.loading}
                  photos={this.props.photos}
                  showFullScreen={this.props.showFullScreen}
                  showFullScreenImage={this.props.showFullScreenImage}
                  fullScreenImage={this.props.fullScreenImage}
                  renderFooter={this.props.renderFooter}
                  showSearchInput={this.props.showSearchInput}
                  log_email={this.props.log_email}
                  user_ID={this.props.user_ID}
                  redirectedOnSignInClick={this.props.redirectedOnSignInClick}
                  createUserImageIDArray={this.props.createUserImageIDArray}
                  imageMatchesArray={this.props.imageMatchesArray}

                  // testing 04/26/20
                  showCardOverlay={this.props.showCardOverlay}
                  showUserCard={this.props.showUserCard}
              />
            </div>
          ) : (null)
          } 
          {this.props.showUserCard && !this.props.loading && !this.props.showCard && this.props.isAuthenticated
           && (this.props.userCollectionData.length !== 0) ? (
            <div className='wrapperDiv'>
              <UserCard 
                  userCollectionData={this.props.userCollectionData}
                  userCardLoading={this.props.userCardLoading}
                  photos={this.props.photos}
                  showFullScreen={this.props.showFullScreen}
                  showFullScreenImage={this.props.showFullScreenImage}
                  fullScreenImage={this.props.fullScreenImage}
                  showSearchInput={this.props.showSearchInput}
                  showCardOverlay={this.props.showCardOverlay}
                  isAuthenticated={this.props.isAuthenticated}
                  showUserCard={this.props.showUserCard}
                  redirectedOnSignInClick={this.props.redirectedOnSignInClick}
                  imageMatchesArrayUser={this.props.imageMatchesArrayUser}
                  log_email={this.props.log_email}
                  user_ID={this.props.user_ID}
                  onViewCollectionClick={this.props.onViewCollectionClick}
                  createUserImageIDArray={this.props.createUserImageIDArray}
                  removedImageUpdateState={this.props.removedImageUpdateState}
              />
            </div>
            ) : (null)
          } 
          {this.props.showFooter ? (
          <Footer 
            onPreviousClick={this.props.onPreviousClick}
            onNextClick={this.props.onNextClick}
          />
        ) : (null)}
        </div>
      );
    }  
  }
}

export default Wrapper