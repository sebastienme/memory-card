import { useEffect, useState } from 'react'
import { Card } from './Utilities'

export const Gifs = () => {
    const [gifs, setGifs] = useState([{title:'', img:''}])
    
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

    return (
        <>
            {gifs.map((item) => (
                <Card key={item.title}>
                    <img src={item.img} alt="" />
                    <div>{item.title}</div>
                </Card>
            ))}
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
