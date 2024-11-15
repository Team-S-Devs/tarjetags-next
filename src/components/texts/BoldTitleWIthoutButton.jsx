import React from 'react'
import BackButton from '../buttons/BackButton'
import BoldTitle from './BoldTitle'

const BoldTitleWithoutButton = ({ children, centered = false, variant='h3', width='initial', style={} }) => {
    const getTitleStyle = () => centered ? { marginLeft: 16, flex: 10 } : { marginLeft: 18, width: width};

    return (
        <div className={"d-flex " + (centered ? "align-items-center justify-content-center" : "")} style={style}>
            <div style={getTitleStyle()}>
                <BoldTitle 
                    textAlign={centered ? "center" : "left"} 
                    variant={variant} 
                    color="#000"
                >{children}</BoldTitle>
            </div>
            { centered &&
                <div>
                    <BackButton color='transparent' disabled />
                </div>
            }
        </div>
    )
}

export default BoldTitleWithoutButton