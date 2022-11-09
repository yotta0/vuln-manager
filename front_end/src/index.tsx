import ReactDOM from 'react-dom';
import App from './App';
import DashProvider from './utils/dash';

ReactDOM.render(<DashProvider>
    <App />
</DashProvider>, document.getElementById('root'));
