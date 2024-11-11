import React from "react";
import "./Home.css";
import VerticalNav from "./Vertical-nav";
import HorizontalNav from "./Horizontal-nav";

const Home = () => {
    return(
        <div className="home">
            <VerticalNav />
            <HorizontalNav />

            <div className="intro-statement">
                <h1>Set off on remarkable journeys with our top-tier tourism and hotel management company</h1>
                <h3>We excel in providing opulent lodging, tailored services, and efficient transport arrangements to make your travel experience both enjoyable and memorable</h3>
                <p>Whether you’re looking for a relaxing beach retreat or an exciting urban adventure, our skilled team is ready to create the ideal getaway for you. Your adventure is just around the corner—allow us to lead you to stunning destinations!</p>
            </div>
        </div> 
    )
}

export default Home;