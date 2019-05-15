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
        {this.props.showCard ? (
            <div className='wrapperDiv'>
                    <Card data={this.props.data}
                          loading={this.props.loading}
                          photos={this.props.photos}
                          showFullScreen={this.props.showFullScreen}
                          showFullScreenImage={this.props.showFullScreenImage}
                          fullScreenImage={this.props.fullScreenImage}
                    />
                
            </div>
            ) : (null)
          } 
          {this.props.showUserCard && !this.props.loading && !this.props.showCard ? (
            <div className='wrapperDiv'>
                    <UserCard userCollectionData={this.props.userCollectionData}
                              userCardLoading={this.props.userCardLoading}
                              photos={this.props.photos}
                              showFullScreen={this.props.showFullScreen}
                              showFullScreenImage={this.props.showFullScreenImage}
                              fullScreenImage={this.props.fullScreenImage}
                    />
               
            </div>
            ) : (null)
          } 
         </div>
      );
    }  
}

export default Wrapper