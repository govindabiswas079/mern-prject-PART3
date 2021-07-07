import React, { useState } from 'react';
import { Grid, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const SearchPost = () => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const query = useQuery();
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const history = useHistory();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Search
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <Grid /* item xs={12} sm={6} md={3} */>
                        <Grid /* className={classes.appBarSearch} */>
                            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search By Title" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAddChip(chip)}
                                onDelete={(chip) => handleDeleteChip(chip)}
                                label="Search By Tags"
                                variant="outlined"
                                fullWidth
                            />
                            <Button onClose={handleClose} onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" fullWidth>Search</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SearchPost;
