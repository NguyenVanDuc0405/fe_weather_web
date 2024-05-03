
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
interface WeatherData {
  temperature: number;
  humidity: number;
  pressure: number;
  rain_prob: number;
  wind_speed: number;
  condition: string;
  weather_image_url: string;

}
const Home = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = today.toLocaleDateString('vi-VN', options);
      setCurrentDate(formattedDate);
    };
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };
    getCurrentDate();
    getCurrentTime();
    // Cập nhật ngày mỗi ngày mới
    const intervalTime = setInterval(getCurrentTime, 1000); // 1000 milliseconds = 1 second
    const intervalDate = setInterval(getCurrentDate, 86400000); // 86400000 milliseconds = 1 day
    return () => {
      clearInterval(intervalDate);
      clearInterval(intervalTime);
    };
  }, []);
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/home');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch data function
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once, similar to componentDidMount

  return (
    <div className="home">
      <div id="header">
        <ul id="nav">
          <li>
            <a href="/home">
              <img src="images/homepage.png" alt="Weather" />
            </a>
          </li>
          <li><a href="/home" className="home_page">Trang Chủ</a></li>
          <li><a href="/hours" className="hours">Theo Giờ</a></li>
          <li><a href="/days" className="days">Theo Ngày</a></li>
        </ul>
      </div>
      <div id="content">
        {/* About section */}
        <div className="box">
          <p className="address">Thời tiết Hà Nội</p>

          <table className="table1">
            {/* hàng 1 bảng 1 */}
            <tr>
              <td>
                <div className="day_time">{currentDate}</div>
                <div className="hour_time">{currentTime}</div>
              </td>
              <td>
                <div className="temperature">
                  <span className="value">{data?.temperature}</span><span><sup>o</sup>C </span>
                </div>
              </td>
              <td>
                <div className="weather">
                  <img src={data?.weather_image_url} alt="" />
                  <p className="predict_weather">{data?.condition}</p>
                </div>
              </td>
            </tr>
          </table>
          <table className="table2">
            {/* hàng 1 - bảng 2 */}
            <tr>
              <td>
                <div className="icon">
                  <img src="images/wind.png" alt="" />
                </div>
                <div className="attribute">
                  <div>
                    <span className="wind">{data?.wind_speed} m/s</span>
                  </div>
                  <p>Tốc độ gió</p>
                </div>
              </td>
              <td>
                <div className="icon">
                  <img src="images/rain.png" alt="" />
                </div>
                <div className="attribute">
                  <div>
                    <span className="rain">{data?.rain_prob} %</span>
                  </div>
                  <p>Khả năng mưa</p>
                </div>
              </td>
            </tr>
            {/* hàng 2 */}
            <tr>
              <td>
                <div className="icon">
                  <img src="images\humidity.png" alt="" />
                </div>
                <div className="attribute">
                  <div>
                    <span className="humidity">{data?.humidity} %</span>
                  </div>
                  <p>Độ ẩm</p>
                </div>
              </td>
              <td>
                <div className="icon">
                  <img src="/images/pressure.png" alt="" />
                </div>
                <div className="attribute">
                  <div>
                    <span className="pressure">{data?.pressure} hPa</span>
                  </div>
                  <p>Áp suất</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}


export default Home;
