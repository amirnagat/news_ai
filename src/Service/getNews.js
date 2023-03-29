import axios from 'axios';
// import React from 'react'

export const getNews = (category ) => {
    const API_KEY = 'cbd6af51f753401eb0f317ddc893f5fc';
    const API_Endpoint = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`
    
   
      return axios.get(`${API_Endpoint}&apiKey=${API_KEY}`)
      

}

