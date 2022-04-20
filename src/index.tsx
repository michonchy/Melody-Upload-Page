import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// JS だけで HTML も CSS も全部表現できるようにしたいから
// なんで JS だけでやりたいのか
// JS / HTML / CSS 分かれて用意していた
// 絵で例えると強制的に3レイヤーで全部を表現しないといけなかった
  // 下書きが HTML
  // 色付けが CSS
  // 全体的な効果が JS
// 部品ごとに細かくレイヤー分けをしたい！！ => Reactが生まれた => Webページを最終的には吐き出したい

// <div id="root"></div>

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
