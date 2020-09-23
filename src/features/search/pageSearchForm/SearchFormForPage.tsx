import React, { useState, useContext, useEffect, } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { RouteComponentProps, Link as RouterLink } from 'react-router-dom';
import Clublist from '../searchResult/ClubList';
import ActivityListItemPlaceholder from '../../activities/dashboard/ActivityListItemPlaceholder';
import InfiniteScroll from 'react-infinite-scroller';
import TextField from '@material-ui/core/TextField';
import Players from '../../../assets/images/tempsearchpic.jpg';
import { makeStyles, Theme, createStyles, Grid, Paper, Button } from '@material-ui/core';
import { searchOptions } from '../../../app/common/options/categoryOptions';
import CircularProgress from '@material-ui/core/CircularProgress';

interface SearchParams {
    searchQuery: string;
    predicate: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            textAlign: 'center'
        },
        paper: {
            textAlign: 'center',
            backgroundColor: 'inherit',
            // width: 800,
            height: 320,
            '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            }
        },
        params: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '25ch',
            },
            '& .MuiButton-root': {
                margin: theme.spacing(1),
                width: 100,
                height: 53.63,
            },
        },
    }),
);

const SearchFormForPage: React.FC<RouteComponentProps<SearchParams>> = ({
    match,
    history
}) => {
    const rootStore = useContext(RootStoreContext);
    const {
        setSearchParams,
        loadClubs,
        loadingInit,
        setPage,
        page,
        totalPages
    } = rootStore.searchStore;

    const [query, setQuery] = useState('');
    const [predicate, setPredicate] = useState('');
    const [loadingNext, setLoadingNext] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        if (isEmpty(match.params)) {
            loadClubs();
        } else {
            if (match.params.searchQuery) {
                setQuery(match.params.searchQuery);
            }
            if (match.params.predicate) {
                setPredicate(match.params.predicate);
            }
            setSearchParams(match.params);
        }
    }, [match.params, match.params.searchQuery, match.params.predicate, history, loadClubs, setSearchParams])


    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadClubs().then(() => setLoadingNext(false));
    };

    function isEmpty(obj: any) {
        return Object.getOwnPropertyNames(obj).length === 0;
    }

    const searchHandler = () => {
        let str = `/clubs`;

        if (query !== '') {
            str = str + `/search/${query}`;
            setQuery(query);
        }
        if (predicate !== '') {
            str = str + `/predicate/${predicate}`;
        }
        return str;
    }

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPredicate(event.target.value as string);
    };

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <div className={classes.root}>
            <Grid container direction="row" spacing={2} justify="center">
                <Grid item xs={10}>
                    <Grid container justify="center">
                        <Grid key={1} item>
                            <Paper className={classes.paper} elevation={0}>
                                <img src={Players} alt='search page' />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <form className={classes.params} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="input-with-icon-serachfield"
                                label="Search"
                                value={query}
                                variant="filled"
                                onChange={handleQueryChange}
                            />
                            <TextField
                                id="standard-select-predicate-native"
                                select
                                label="Predicate"
                                value={predicate}
                                onChange={handleSelectChange}
                                SelectProps={{
                                    native: true,
                                }}
                                variant="filled"
                            >
                                {searchOptions.map((option) => (
                                    <option key={option.key} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </TextField>
                            <Button variant="contained" color="primary" component={RouterLink} to={searchHandler}>
                                SEARCH
                            </Button>
                        </div>
                    </form>
                </Grid>
                <Grid item xs={10}>
                    {loadingInit && page === 0 ? (
                        <ActivityListItemPlaceholder />
                    ) : (
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={handleGetNext}
                                hasMore={!loadingNext && page + 1 < totalPages}
                                initialLoad={false}
                            >
                                <Clublist />
                            </InfiniteScroll>
                        )}
                </Grid>
                <Grid item xs={10} >
                    {!loadingInit ? <Button onMouseOver={() => setLoadingNext(true)}>
                        Loading 
                    </Button> : <CircularProgress disableShrink />}
                </Grid>
            </Grid>
        </div>
    );
};

export default observer(SearchFormForPage);
