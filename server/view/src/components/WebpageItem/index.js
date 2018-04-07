import React from 'react';
import moment from 'moment'
import './webpage-list-item.scss';

const WebpageItem = ({timestamp,id, url, onClick, htmlDiffStatus}) => {
    
    const classNames = [
        "webpage-list-item"
    ]

    switch(htmlDiffStatus) {
        case true:
             classNames.push('marker-green');
             break;
        case false:
             classNames.push('marker-yellow');
             break;
    }

    return (
        <div className={classNames.join(' ')} onClick={() => onClick(url, id)}>
            <div className="date">{moment(timestamp).fromNow()}</div>  
            <div className="url"><a href={url} target="_blank"> {url}</a></div>  
        </div>
    )
};

export default WebpageItem;