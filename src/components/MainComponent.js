import React, { useState } from 'react';
import VerticalNav from './Vertical-nav';
import HorizontalNav from './Horizontal-nav';

const MainComponent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    console.log("Sidebar isOpen:", isSidebarOpen); // Check if state changes when toggling

    return (
        <div style={{ display: 'flex' }}>
            {/* VerticalNav will now react to the state */}
            <VerticalNav 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
            />
            <div style={{ 
                marginLeft: isSidebarOpen ? '250px' : '0', 
                transition: 'margin-left 0.3s ease', 
                padding: '10px'
            }}>
                <HorizontalNav />
                {/* Other content */}
            </div>
        </div>
    );
};

export default MainComponent;
