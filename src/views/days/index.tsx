
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
interface WeatherData {
  weather_image_url: string;
  day: number;
  condition: string;
  temperature: number;
  wind_speed: number;
  rain_prob: number;
  humidity: number;
  pressure: number;
  time: Date;
}
const Days = () => {
  const [data, setData] = useState<WeatherData[]>([]);
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = today.toLocaleDateString('vi-VN', options);
      setCurrentDate(formattedDate);
    };

    getCurrentDate();
    // Cập nhật ngày mỗi ngày mới
    const intervalDate = setInterval(getCurrentDate, 86400000); // 86400000 milliseconds = 1 day
    return () => {
      clearInterval(intervalDate);
    };
  }, []);
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/days');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch data function
    fetchData();
  }, []);
  console.log(data)

  return (
    <div className="day">
      <div id="header">
        <ul id="nav">
          <li>
            <a href="/home">
              <img src="/images/homepage.png" alt="Weather" />
            </a>
          </li>
          <li><a href="/home" className="home_page">Trang Chủ</a></li>
          <li><a href="/hours" className="hours">Theo Giờ</a></li>
          <li><a href="/days" className="days">Theo Ngày</a></li>
        </ul>
      </div>
      <div id="content">
        <div className="box">
          <div className="address">Thời tiết 7 ngày tiếp theo - Hà Nội
            <div id="current_date" className="day_time">{currentDate}</div>
          </div>
          {data.map((item, index) => (
            <div key={index}>
              <table className="table1">
                <tr>
                  <td>
                    <div className="weather">
                      <img src={item?.weather_image_url} alt="" />
                      <div className="hour_time">{item?.day} ngày tiếp theo
                        <p className="predict_weather">{item?.condition}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="rain">
                      <p id="next_date">{new Date(item?.time).toLocaleDateString('vi-VN', { day: "2-digit", month: "2-digit", year: "numeric", })}</p>
                    </div>
                  </td>
                  <td>
                    <div className="temperature">
                      <span className="value">{item?.temperature.toFixed(1)}</span>
                      <span>
                        <sup>o</sup>C
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
              <table className="table2">
                <tr>
                  <td>
                    <div className="icon">
                      <img src="/images/wind.png" alt="" />
                    </div>
                    <div className="attribute">
                      <div>
                        <span className="wind">{item?.wind_speed.toFixed(2)} m/s</span>
                      </div>
                      <p>Tốc độ gió</p>
                    </div>
                  </td>
                  <td>
                    <div className="icon">
                      <img src="/images/rain.png" alt="" />
                    </div>
                    <div className="attribute">
                      <div>
                        <span className="predict_rain">{item?.rain_prob.toFixed(2)} %</span>
                      </div>
                      <p>Khả năng mưa</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="icon">
                      <img src="/images/humidity.png" alt="" />
                    </div>
                    <div className="attribute">
                      <div>
                        <span className="humidity">{item?.humidity.toFixed(1)} %</span>
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
                        <span className="pressure">{item?.pressure.toFixed(1)} hPa</span>
                      </div>
                      <p>Áp suất</p>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};


export default Days;
