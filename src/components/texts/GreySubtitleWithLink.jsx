import React from 'react'
import GreySubtitle from './GreySubtitle'
import LinkComponent from '../buttons/LinkComponent'

const GreySubtitleWithLink = ({ subtitleText = "", linkText = "", centered, linkSize = 18, to }) => {
    const getTitleStyle = () => centered ? { marginLeft: 16, flex: 10 } : { marginLeft: 16 };

  return (
    <div className="d-flex resp-grey-subtitle-link">
        <div>
            <GreySubtitle variant='h6'>{subtitleText}</GreySubtitle>
        </div>
        <div style={getTitleStyle()}>
            <LinkComponent to={to} size={linkSize}>{linkText}</LinkComponent>
        </div>
    </div>
  )
}

export default GreySubtitleWithLink