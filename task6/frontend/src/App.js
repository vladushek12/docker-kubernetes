import React, { useEffect, useState } from 'react';

const API_URL = '/api'; 

function App() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/news`)
      .then(res => res.json())
      .then(setNews);
  }, []);

  const addNews = () => {
    fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
      .then(() => {
        setNews([...news, { title, content }]);
        setTitle('');
        setContent('');
      });
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Лента новостей</h1>
      <div>
        <input
          placeholder="Заголовок"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <textarea
          placeholder="Содержание"
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={4}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <button onClick={addNews}>Добавить новость</button>
      </div>
      <hr />
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
