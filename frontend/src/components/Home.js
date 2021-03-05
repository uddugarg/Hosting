import React from 'react'
import Header from './Header/Header'
import Post from './Post/Post'
import '../App.css'

function Home() {
    return (
        <div className='home'>
            <Header />

            <Post />
        </div>
    )
}

export default Home
