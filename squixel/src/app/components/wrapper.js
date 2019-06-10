import React, { Component } from 'react';
import Card from './card';
import UserCard from './userCard';
import Footer from './footer';

class Wrapper extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

    render() {
      return (
        <div className='body-container'>
          {this.props.showCard ? (
            <div className='wrapperDiv'>
              <Card 
                  data={this.props.data}
                  loading={this.props.loading}
                  cardRendered={this.props.cardRendered}
                  photos={this.props.photos}
                  showFullScreen={this.props.showFullScreen}
                  showFullScreenImage={this.props.showFullScreenImage}
                  fullScreenImage={this.props.fullScreenImage}
                  renderFooter={this.props.renderFooter}
                  showSearchInput={this.props.showSearchInput}
              />
            </div>
          ) : (null)
          } 
          {this.props.showUserCard && !this.props.loading && !this.props.showCard && this.props.isAuthenticated ? (
            <div className='wrapperDiv'>
              <UserCard 
                  userCollectionData={this.props.userCollectionData}
                  userCardLoading={this.props.userCardLoading}
                  photos={this.props.photos}
                  showFullScreen={this.props.showFullScreen}
                  showFullScreenImage={this.props.showFullScreenImage}
                  fullScreenImage={this.props.fullScreenImage}
                  showSearchInput={this.props.showSearchInput}
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

export default Wrapper