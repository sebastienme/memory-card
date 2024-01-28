import { useEffect, useState } from 'react'
import { Gifs } from './components/Gif'
import './App.css'

const App = () => {

  return (
    <>
      <div className='header'>
        <div className='header__title'>Jeu de mémoire de pays</div>
        <div className='header__scores'>
          <div className='header__scores__score'>Score: </div>
          <div className='header__scores__best-score'>Meilleur score: </div>
        </div>
      </div>
      <div className='main'>
        <div className='main__title'>Gagnez des points en cliquant sur une image mais ne cliquez pas plus d'une fois !</div>
        <div className='main__game'>
          <Gifs />
        </div>
      </div>
    </>
  )
}

export default App
