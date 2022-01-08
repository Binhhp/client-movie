import ReactDOM from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//Favicon
import Favicon from 'react-favicon';
// project imports
import App from 'App';
import config from 'store';

// style + assets
import 'assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

ReactDOM.render(
    <div className="aod">
        {/* <Favicon url="favicon.ico?v=2"></Favicon> */}
        <Provider store={config.store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </div>,
    document.getElementById('root')
);

