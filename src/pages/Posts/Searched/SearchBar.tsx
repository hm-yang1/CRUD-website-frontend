import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';

const StyledSearchBar = styled(TextField)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.7)',
    width: '100%',
    color:'white',
    borderColor: 'white',
    borderRadius: theme.shape.borderRadius,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
        borderColor: 'transparent',
        },
        '&:hover fieldset': {
        borderColor: 'transparent',
        },
        '&.Mui-focused fieldset': {
        borderColor: 'white',
        },
    },
    '&:focus': {
        outline: 'none',
    },
}));

const CenteredSearchBar = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%', // or adjust to your desired height
});

export default function SearchBar() {
    const location = useLocation()
    const navigate = useNavigate();
    const [query, setQuery] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    const handleSearch = () => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('query', query);

        //Reload if already at filtered posts page
        if (window.location.pathname.startsWith('/searched-posts')) {
            navigate(`/searched-posts?${queryParams.toString()}`)
            window.location.reload();
        } else {
            navigate(`/searched-posts?${queryParams.toString()}`)
        }
    };

    useEffect(() => {//To remember the search query
        if(window.location.pathname.startsWith('/searched-posts')) {
            const params = new URLSearchParams(location.search);
            const queryFromUrl = params.get('query');
            setQuery(queryFromUrl || '');
        }
    }, [location.search])

    return (
            <StyledSearchBar
                placeholder='Search...'
                // variant='outlined'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
    );
}