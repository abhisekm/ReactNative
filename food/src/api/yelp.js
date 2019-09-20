import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: 'Bearer g1nKb-NxeQo45plPoRdeaLXV1S1AjjoDkFTTiJhEPpCPqyqwPd_9-4TSlRugSt99KCd7cfL-0kNKN09Nop264bQstf8xE95xAbrMOTqKNM0v2DYgpniVbbNO9K2EXXYx'
  }
});