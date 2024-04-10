import { useState, useEffect } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import Cube from './Cube';

const App = () => {
  const [news, setNews] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState(0);

  const fetchData = async () => {
    try {
      const statusResponse = await axios.get('https://helldiverstrainingmanual.com/api/v1/war/status');
      const weekAgoTime = statusResponse.data.time - (7 * 24 * 60 * 60);
      const newsResponse = await axios.get(`https://helldiverstrainingmanual.com/api/v1/war/news?from=${weekAgoTime}`);
      let latestNews = "No recent news available.";
      if (newsResponse.data && newsResponse.data.length > 0) {
        newsResponse.data.sort((a, b) => b.published - a.published);
        const latestNewsItem = newsResponse.data[0];
        latestNews = latestNewsItem.message
          .replace(/<i=\d+>/g, "")
          .replace(/<\/i>/g, "")
          .replace(/([A-Z\s]+\.)\s/g, '$1<br><br>')
          .replace(/NEW MAJOR ORDER<br><br>/g, "");

      }

      const campaignResponse = await axios.get('https://helldiverstrainingmanual.com/api/v1/war/campaign');
      let campaignsData = campaignResponse.data;
      const bugs = '🪲';
      const bots = '🤖';
      campaignsData = campaignsData.map(campaign => {
        const factionEmoji = campaign.faction === 'Terminids' ? bugs : bots;
        return {
          ...campaign,
          factionEmoji,
          percentage: campaign.percentage.toFixed(2),
        };
      });

      setCampaigns(campaignsData);
      setNews(latestNews);
      setTotalPlayers(campaignsData.reduce((acc, campaign) => acc + campaign.players, 0));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>

      <div style={{ height: '100vh', width: '100vw', zIndex: '-1', position: 'fixed' }}>
        <Canvas camera={{ position: [0, 0, 120] }}>
          <Cube />
        </Canvas>
      </div>

      <div className='app'>

        <header>
        <h1>Freedom.xyz</h1>
        <h3><span>Total Helldivers: </span><span>{totalPlayers.toLocaleString()}</span></h3>
        </header>
        

        <div className='news'>
          <p dangerouslySetInnerHTML={{ __html: news }}></p>
        </div>

        <div className='campaigns'>
          {campaigns.map((campaign, index) => (
            <div key={index} className="campaign-item">
              <h4><span>{campaign.factionEmoji}</span> <span>{campaign.name}</span> <span>{campaign.factionEmoji}</span></h4>
              <p>Helldivers: {campaign.players.toLocaleString()}</p>
              <p>Progress: {campaign.percentage}%</p>
            </div>
          ))}
        </div>

        <div className='footer'>
          <p>Would you like to know more?</p>
        </div>

      </div>
    </div>

  );

}

export default App;