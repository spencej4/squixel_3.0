import React, { Component } from 'react';
import Card from './card';
import UserCard from './userCard';

class Wrapper extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

    render() {
      return (
        <div className='body-container'>
            <div className='wrapperDiv'>
                {this.props.showCard ? (
                    <Card data={this.props.data}
                          loading={this.props.loading}
                          photos={this.props.photos}
                          showFullScreen={this.props.showFullScreen}
                          showFullScreenImage={this.props.showFullScreenImage}
                          fullScreenImage={this.props.fullScreenImage}
                    />
                ) : (null)
                } 
            </div>
            <div className='wrapperDiv'>
                {this.props.showUserCard && !this.props.loading && !this.props.showCard ? (
                    <UserCard userCollectionData={this.props.userCollectionData}
                              userCardLoading={this.props.userCardLoading}
                              photos={this.props.photos}
                              showFullScreen={this.props.showFullScreen}
                              showFullScreenImage={this.props.showFullScreenImage}
                              fullScreenImage={this.props.fullScreenImage}
                    />
                ) : (null)
                } 
            </div>
         </div>
      );
    }  
}

export default Wrapper