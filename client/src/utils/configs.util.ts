

const REACT_API_BASE_URL = process.env.REACT_API_BASE_URL as string || 'http://localhost:5000';

const REACT = {
    apiBaseUrl: REACT_API_BASE_URL
};

const configs = {
    react: REACT
};

export default configs;