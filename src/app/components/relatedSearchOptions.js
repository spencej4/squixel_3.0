import React, {Component} from 'react';

class RelatedSearchOptions extends Component {

    render() {
        return(
            this.props.relatedSearchTags.map((item, index) => {
                return (
                    <div className='relatedSearchOption'
                        value={item}
                        key={index}
                        onClick={() => this.props.onRelatedSearchClick(item)}
                    >
                        <p>{item}</p>
                    </div>
                )
            })
        )
    }
}

export default RelatedSearchOptions;