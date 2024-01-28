import { useEffect, useRef, useState } from 'react'
import { Card } from './Utilities'
import { shuffle } from 'fast-shuffle'

export const Gifs = () => {
    const [gifs, setGifs] = useState([{title:'', img:''}])
    const [userPick, setUserPick] = useState(null)
    const [score, setScore] = useState(0)
    const [bestScore, setBestScore] = useState(0)
    
    useEffect(() => {
        const fetchGifs = async () => {
            try {
                const gifsArray = await getGiphyList()
                setGifs(gifsArray)
            } catch (error) {
                console.log("Erreur fetch gif: " + error)
            }
        }
        fetchGifs();
    }, [])

    const handleClick = (cardId) => {
        setUserPick(cardId)
        if (userPick === cardId) {
            setScore(0)
            if (score > bestScore) {
                setBestScore(score)
            }
        } else {
            setScore(score +1)
        }
    }
    

    return (
        <>
            <div className='header'>
                <div className='header__title'>Jeu de mémoire de pays</div>
                <div className='header__scores'>
                <div className='header__scores__score'>Score:<span>{score}</span></div>
                <div className='header__scores__best-score'>Meilleur score:<span>{bestScore}</span></div>
                </div>
            </div>
            <div className='main'>
                <div className='main__title'>Gagnez des points en cliquant sur une image mais ne cliquez pas plus d'une fois !</div>
                <div className='main__game'>
                {shuffle(gifs.map((item) => (
                <Card 
                    key={item.title}
                    handleClick={() => handleClick(item.title)}
                >
                    <img src={item.img} alt="" />
                    <div>{item.title}</div>
                </Card>
            )))}
                </div>
            </div>
        </>
    )
} 

const getGiphyList = () => {
    const getApiKey = () => {
        return 'lC8aXeSjvePvNJ4NL21mg7MSBtHhEMuM'
    }

    const getGif = async (query) => {
        try {
            const gif = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${getApiKey()}&s=${query}`)
            const gifObj = await gif.json();
            
            return gifObj.data.images.original.url;
        } catch (error) {
            console.log(error)
        }
    }

    const addGifToArray = async () => {
        const giphyList = []
        const gifQueries = [
            'Madrid',
            'Cats',
            'Trump',
            'Denzel',
            'Jurassic',
            'Jaws',
            'Barbie',
            'iPhone',
            'Golden Bridge',
            'Rio de Janeiro',
            'FBI',
            'Xbox'
        ]
        try {
            const gifUrls = await Promise.all(gifQueries.map(async (item) => ({
                title: item,
                img: await getGif(item)
            })))

            giphyList.push(...gifUrls)

            console.log(giphyList)
        } catch (error) {
            console.log(error);
        }
        return giphyList;
    }

    return addGifToArray();
}
