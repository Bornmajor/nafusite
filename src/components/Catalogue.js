import React from 'react';

const Catalogue = ({children,title}) => {
    return (
        <div className='catalogue'>
        <p className='section-header'>{title}</p>
        <div className='horizontal-scrollable'>
        
            {children}
            
        </div>
        </div>
        
    );
}

export default Catalogue;
