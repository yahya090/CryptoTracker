import { Link, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../config/api';
import { CryptoState } from '../CryptoContext';
import AliceCarousel from 'react-alice-carousel';

const useStyles = makeStyles((theme) => ({
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(4),
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform:  "uppercase",
        color: "white",
    },
    coinName: {  // This is the new style for the coin names
        color: 'white',
    }
}));

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
    const [trending, setTrending] = useState([]);
    const classes = useStyles();

    const {currency,symbol} = CryptoState();

    useEffect(() => {
        const fetchTrendingCoins = async () => {
            const { data } = await axios.get(TrendingCoins(currency));
            setTrending(data);
        };
    
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map((coin) =>{
        let profit = coin.price_change_percentage_24h >=0;

        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{marginBottom:10}}
                />
                {/* Here, I applied the 'coinName' style to your coin names */}
                <span className={classes.coinName}>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                        }}
                        
                        
                        >
                        {profit && "+"}{coin?.price_change_percentage_24h?.toFixed(2)}%</span>
                </span>
                <span style={{ fontSize:22, fontWeight: 500}}>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },    
    };

    return  <div className={classes.carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
        />
    </div>; 
};

export default Carousel;
