import { Box, Grid, Stack, Typography } from '@mui/material';
import { ModalContextProvider } from 'contexts/monitoringContext';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'ui-component/cards/MainCard';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import Loader from 'ui-component/Loader';
import Tables from 'ui-component/tables';
import { columnMovie } from './configuration';
import { Movie } from 'store/Movie/api'
import Create from './Actions/Create';

function MovieFeature() {
    const stateMovie = useSelector(state => state.movie);
    const dispatch = useDispatch();

    useEffect(() => {
        Promise.all([
            dispatch(Movie.Get())
        ])
    }, [dispatch])
    
    return(
        <React.Fragment>
            {(stateMovie?.loading) && <Loader />}
            <MainCard title="Management Movie">
                <Breadcrumbs 
                    titleBottom={true}
                    title={true} 
                    rightAlign={true} 
                    icon={true} >    
                </Breadcrumbs>
                <ModalContextProvider>
                    {/* Action Mailboxes */}
                    <Grid sx={{ marginBottom: '30px' }} container columns={12}>
                        <Stack sx={{width: '100%'}} direction="row" justifyContent="end">
                            <Typography variant="h4"></Typography>
                            <Box component="div">
                                <Create />
                            </Box>
                        </Stack>
                    </Grid>
                    {/* Tables Mailboxes */}
                    <Tables 
                        columns={columnMovie(stateMovie.body)} 
                        title="Movie Management" 
                        dataTable={stateMovie?.body ?? []}/>
                </ModalContextProvider>
            </MainCard>
        </React.Fragment>
    )
}

export default MovieFeature;