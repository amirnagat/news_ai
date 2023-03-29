import alanBtn from "@alan-ai/alan-sdk-web";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { getNews } from "../Service/getNews";


// TO Start the voice control
//  you need to say "Show me (sport || health || buisness || general)  news"

const NewsData = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectOption, setSelectOption] = useState("");
  const alanKey = "06bc31f2527169db2a320032994fe2892e956eca572e1d8b807a3e2338fdd0dc/stage"


  const getAllNews = async () => {
    let data = await getNews(selectOption);
     setNewsData(data.data.articles);
  };

  const selectCategory = (event) => {
    setSelectOption(event.target.value);
  };


useEffect(()=>{
    alanBtn({
        key: alanKey,
        onCommand: (commandData) => {
            setSelectOption(commandData.data);
        }
    })
})




  useEffect(() => {
    getAllNews();
  }, [selectOption]);


  return (
    <div className="main">
      <h1>Voice News</h1>
      <div className="select">
        <label for="cars">Choose a category:</label>
        <select
          className="select-box"
          name="category"
          id="category"
          onChange={selectCategory}
          value={selectOption}
        >
          <option value="sport">Sport</option>
          <option value="general">General</option>
          <option value="health">Health</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div className="grid-main">
        {newsData?.map((news) => {
          return (
            <div className="grid-child">
              <img className="news-image" src={news?.urlToImage} alt="img" />
              <p className="news-title"> {news?.title}</p>
              <p className="news-content"> {news?.content}</p>
              <div className="space-between">
                <p className="news-author">
                  Author:{" "}
                  {news?.author ? news?.author : "Author name not available"}
                </p>
                <p className="news-date">
                  Date: {moment(news?.publishedAt).format("LL")}
                </p>
              </div>
              <a href={news?.url} target="_blank" rel="noreferrer">
                READ More...
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewsData;
