import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';
import {Box, IconButton, InputLabel , TextField, Typography} from '@mui/material';
import { Search } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { setFavourites, setLogin } from '../../state';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
function HomePage() {
    const [favourite, setFavourite] = useState('Delhi');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [currentData, setCurrentData] = useState([]);
    const token = useSelector((state) => state.token);
    const favourites = useSelector((state) => state.favourites);

    const dispatch = useDispatch();
    const getWeather =  async() => {
      if(isSearch === false){
        const weatherReport = await fetch(`http://127.0.0.1:8000/user/get-weather/${favourite}`);
        const data = await weatherReport.json();
        console.log(data.list);
        setCurrentData(data.list.slice(0,4));
        console.log(currentData);
      }else{
        const weatherReport = await fetch(`http://127.0.0.1:8000/user/get-weather/${searchQuery}`);
        const data = await weatherReport.json();
        console.log(data.list);
        setCurrentData(data.list.slice(0,4));
        console.log(currentData);
      }
      
  }
    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
        console.log(event.target.value);
    }
    const handleSearach = () => {
      setIsSearch(true);
        getWeather();
    }
    const handleFavourite = async() => {
      const response = await fetch('http://127.0.0.1:8000/user/add-favourite/', {
        method: "PUT",
        headers: { Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json"},
        body: JSON.stringify({Newfavourite : (isSearch ? searchQuery : favourite)})
      });
      const data = await response.json();
      dispatch(setFavourites({
        favourites : data
      }))
    }
    const getTime = (tim) => {
        if(tim>12 && tim<24){
            return toString(tim-12)+"PM"
        }else if(tim==12){
            return toString(tim)+"PM"
        }
        else{
            return toString(tim)+"AM"
        }
    }
    
    
    const handleChange = (event) => {
        setFavourite(event.target.value);
        setIsSearch(false);
    };
    useEffect(() =>
        {getWeather()}, [favourite]);
  return (
    <>
    {console.log(favourites)}
      <Navbar />
        <Box width="100%" paddingTop="4%" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <TextField   
          id="standard-basic" label="Search" variant="standard" onChange={handleSearchQuery}/>
          <IconButton onClick={handleSearach}>
              <Search/>
          </IconButton>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Favourites</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Favourites"
          value={favourite}
          onChange={handleChange}
        >
        {favourites.map((fav) => <MenuItem key={fav}  onSelect={handleChange} value={fav}>{fav}</MenuItem>)}
          
          
        </Select>
      </FormControl>
        </Box>
        <Typography paddingLeft="5%">
        <IconButton onClick={handleFavourite}>
          {isSearch ? (favourites.includes(searchQuery)) ? (<FavoriteIcon />) : (<FavoriteBorderIcon />) : (<FavoriteIcon />) }
          
        </IconButton>
        Today's weather in {isSearch ? searchQuery : favourite} is : 

        </Typography>
        
        <Box width="100%" paddingTop="4%" paddingLeft="5%" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {currentData.map((data) => <Box key={data.dt_txt} width="25%">
                <Typography>{ data.dt_txt.substring(11,13)+ "hrs."

                }</Typography>
                <Typography>Temp. : {Math.trunc(data.main.temp - 272.15)} C</Typography>
                <small>Feels like : {Math.trunc(data.main.feels_like - 272.5)} C</small>
                <Typography>Humidity: {data.main.humidity}</Typography>
            </Box>)}
        </Box>
    </>
  )
}

export default HomePage;
