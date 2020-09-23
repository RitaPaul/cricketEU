import React, { useState, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { makeStyles, Theme, createStyles, Grid, Paper, Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { searchOptions } from '../../../app/common/options/categoryOptions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            textAlign: 'center',
            zIndex: theme.zIndex.modal,
            padding: theme.spacing(2),
        },
        paper: {
            textAlign: 'center',
            backgroundColor: 'inherit',
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

const SearchFormHome = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        predicate
    } = rootStore.searchStore;
    const { closeSearchModal } = rootStore.modalStore;

    const [query, setQuery] = useState('');
    const [predicated, setPredicated] = useState(searchOptions[0].value || 'Club');
    const [searchFor, setSearchFor] = useState('');

    useEffect(() => {
        predicate.clear();
    }, [predicate])

    const classes = useStyles();

    useEffect(() => {
        if (query || predicated) {
            let str = `/clubs`;
            if (query !== '') {
                str = str + `/search/${query}`;
                setQuery(query);
            }
            if (predicated !== '') {
                str = str + `/predicate/${predicated}`;
            }
            setSearchFor(str);
        }
    }, [query, predicated, setSearchFor])

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setPredicated(event.target.value as string);
    };
    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };


    return (
        <div className={classes.root}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={0}>
                        <Typography variant="h3" component="h2">
                            How can we <span>help</span> you?
                        </Typography>
                        <Typography variant="body1">
                            Find players and clubs here...
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
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
                                value={predicated}
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
                            <Button variant="contained" color="primary" href={searchFor} onClick={() => closeSearchModal()}>
                                SEARCH
                            </Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </div >
    );
};

export default observer(SearchFormHome);
