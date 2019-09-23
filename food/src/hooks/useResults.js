import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'san jose'
        }
      });
      setResults(response.data.businesses)
      setTotalResults(response.data.total)
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  }

  useEffect(() => {
    searchApi('pasta')
  }, []);

  return [searchApi, results, totalResults, errorMessage];

}