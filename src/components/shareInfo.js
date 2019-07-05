import React from 'react'
import {TelegramShareButton} from 'react-share'
import {TelegramIcon} from 'react-share'

class ShareInformation extends React.Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
  }
  
  

  render () {
    let data = this.props
    const shareUrl = "https://www.metadium.com"
    const title = "Metadium Home Page"
    return (
      <div className="share-component">
        <h1> Share with the World! </h1>
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="telegram-share-button">
        
          <TelegramIcon
            size={32}
            round
          />
        </TelegramShareButton>
      </div>
    );
  }
}


export default ShareInformation;
