import React from 'react';
import WebpageItem from '../WebpageItem';
import WebpageListTitle from '../WebpageListTitle'
import './webpages-list.scss';

class WebpagesList extends React.Component {

    componentDidMount() {
        this.fetchHistory();
    }

    constructor(props) {
        super(props);
        this.compareContent = this.compareContent.bind(this);
        this.setSearchQuery = this.setSearchQuery.bind(this);
        this.state = {
            history: [],
            searchQuery: ''
        }
        this.API_ENDPOINT = API_ENDPOINT
    }

    compareContent(url, id) {
        url = encodeURIComponent(url);
        fetch(`${this.API_ENDPOINT}/tracking/webpages/${url}/compare`)
            .then(response => response.json())
            .then(data => {
                const history = this.state.history;
                const index = history.findIndex((history) => history._id === id)
                if(index === -1) { return; }

                history[index].htmlDiffStatus = data.result;
                this.setState({history: [...history]})
            })
            .catch((e) => {
                // Should be implemented a failsafe.
            })    
    }

    fetchHistory() {
        fetch(`${this.API_ENDPOINT}/tracking/webpages`)
        .then(response => response.json())
        .then(data => this.setState({history: data}))
        .catch((e) => {
            // Should be implemented a failsafe.
        })
    }

    setSearchQuery(event) {
        this.setState({searchQuery: event.target.value})
    }

    render() {
        let history = this.state.history;
        const searchQuery = this.state.searchQuery;

        if(searchQuery) {
            history = history.filter(history => history.url.match(new RegExp(searchQuery),'gi'))
        }

        return (<div className="webpages-list"> 
            <input className="search" onChange={this.setSearchQuery} placeholder="Search by a regex" />
            <WebpageListTitle />
            {history.map(history => <WebpageItem htmlDiffStatus={history.htmlDiffStatus} key={history._id} id={history._id} url={history.url} onClick={this.compareContent} timestamp={history.lastViewDate} />)}
        </div>)
    }
}

export default WebpagesList;