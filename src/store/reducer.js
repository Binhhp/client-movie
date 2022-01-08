import { combineReducers } from 'redux';
import castReducer from './Cast/reducer';

// reducer import
import customizationReducer from './Customization/customizationReducer';
import genresReducer from './Genres/reducer';
import movieReducer from './Movie/movieReducer';
import companyReducer from './Company/reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    movie: movieReducer,
    genres: genresReducer,
    casts: castReducer,
    companies: companyReducer
});

export default reducer;
