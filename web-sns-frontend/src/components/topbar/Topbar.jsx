import React from 'react';

export default function Topbar() {
    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <span className='logo'>Web SNS</span>
            </div>
            <div className='topbarCenter'>
                <div className='searchbar'>
                    <input type='text' className='searchInput' placeholder='Search for friends, posts or videos' />
                </div>
            </div>
            <div className='topbarRight'>
                <div className='topbarIconItem'>1</div>
                <div className='topbarIconItem'>2</div>
            </div>
            <img src='assets/person/1.jpeg' alt='' className='topbarImg' />
        </div>
    );
}
