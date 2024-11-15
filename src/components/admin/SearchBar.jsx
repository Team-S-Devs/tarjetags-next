import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { FaSearch } from "react-icons/fa";
import useWindowSize from '../../hooks/useWindowsSize';
import { RiArrowGoBackFill } from "react-icons/ri";
import { Divider } from '@mui/material';
import { MdArrowBackIos } from "react-icons/md";


const SearchBar = ({ setSearchVal }) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        setSearchVal(searchValue);
    };

    const resetData = () => {
        setSearchVal("");
    };

    const { width } = useWindowSize();

    return (
        <div className='search-container'>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                onSubmit={(e) => {
                    e.preventDefault(); handleSearch()
                }}
            >
                <IconButton type="button" sx={{ p: '4px', paddingRight: '0px' }} aria-label="back" onClick={resetData}>
                    <MdArrowBackIos />
                </IconButton>

                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        fontSize: width < 350 ? '0.85rem' : '1rem'
                    }}
                    placeholder="Buscar email"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
                <IconButton type="button" sx={{ p: '10px', paddingLeft: '5px' }} aria-label="search" onClick={handleSearch}>
                    <FaSearch />
                </IconButton>
            </Paper>
        </div>
    );
};

export default SearchBar;
