import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/card';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const data = new FormData()
    data.append("actionName", "MessagesLoad")
    axios.post("http://f0665380.xsph.ru/", data)
      .then(res => {
        const sortedMessages = res.data.Messages.sort((a, b) => (
          new Date(a.date).getTime() - new Date(b.date).getTime()
        ))
        setData(sortedMessages)
      })
  }, [])

  const reverse = (e) => {
    const rev = data.reverse();
    if (e.target.value) {
      return setData([...rev])
    }

  }
  return (
    <div className='wrapper'>
      <div onChange={(e) => reverse(e)} className='radio_wrapper'>
        <label >
          <input name='radio' className='radio' type={"radio"} />
          Новые сверху
        </label>
        <label>
          <input defaultChecked name='radio' className='radio' type={"radio"} />
          Новые снизу
        </label>
      </div>
      {
        data.map((el) => <Card key={el.id} {...el} />)
      }
    </div>
  );
}

export default App;
