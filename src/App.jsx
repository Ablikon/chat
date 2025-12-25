import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const messagesEndRef = useRef(null)

  const conversation = [
    { sender: 'me', text: 'у меня нет настроения, забей', delay: 2500, typingDelay: 1500 },
    { sender: 'her', text: 'нет, не забью', delay: 3000, typingDelay: 2000 },
    { sender: 'her', text: 'что случилось, моя котя? 🥺', delay: 2500, typingDelay: 1800 },
    { sender: 'me', text: 'просто все надоело', delay: 3500, typingDelay: 2000 },
    { sender: 'me', text: 'устала от всего', delay: 2800, typingDelay: 1500 },
    { sender: 'her', text: 'Послушай меня', delay: 2500, typingDelay: 1500 },
    { sender: 'her', text: 'Ты самый важный человек в моей жизни', delay: 3500, typingDelay: 2500 },
    { sender: 'her', text: 'И я всегда буду рядом, что бы ни случилось', delay: 4000, typingDelay: 2800 },
    { sender: 'me', text: 'правда? 🥺', delay: 2000, typingDelay: 1200 },
    { sender: 'her', text: 'Конечно правда!', delay: 2000, typingDelay: 1000 },
    { sender: 'her', text: 'Ты моя самая любимая котя ❤️', delay: 3000, typingDelay: 2000 },
    { sender: 'her', text: 'Самая красивая, самая умная', delay: 3000, typingDelay: 2000 },
    { sender: 'her', text: 'И я так горжусь тобой', delay: 2800, typingDelay: 1800 },
    { sender: 'her', text: 'Ты делаешь мою жизнь лучше каждый день ', delay: 3500, typingDelay: 2500 },
    { sender: 'her', text: 'Я всегда здесь для тебя', delay: 2800, typingDelay: 1800 },
    { sender: 'her', text: 'Знаешь что?', delay: 2000, typingDelay: 1000 },
    { sender: 'her', text: 'У меня есть для тебя кое-что 💖', delay: 3000, typingDelay: 2000 },
  ]

  const startChat = () => {
    setChatStarted(true)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (!chatStarted) return

    if (currentMessageIndex < conversation.length) {
      const currentMsg = conversation[currentMessageIndex]
      
      const typingTimer = setTimeout(() => {
        setIsTyping(true)
      }, 800)

      const messageTimer = setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, { ...currentMsg, time: new Date() }])
        setCurrentMessageIndex(prev => prev + 1)
      }, currentMsg.delay + currentMsg.typingDelay)

      return () => {
        clearTimeout(typingTimer)
        clearTimeout(messageTimer)
      }
    } else {
      setTimeout(() => {
        setShowFinal(true)
      }, 2000)
    }
  }, [currentMessageIndex, chatStarted])

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
  }

  if (showFinal) {
    return (
      <div className="final-screen">
        <div className="final-content">
          <h1>Ты важна мне больше всего на свете ❤️</h1>
          <p>Никогда не забывай, что ты особенная</p>
          <p>Я всегда буду любить тебя, моя котя</p>
          <p>Ты моё счастье, моя радость, моя жизнь, любовь моя</p>
          <img src="/IMG_4313.JPG" alt="Для тебя" className="final-image" />
          <div className="hearts">💕 ❤️ 💖 💗 💓</div>
          <p>Если у тебя что-то случилось, то и в реальной жизни расскажи мне пожалуйста</p>
        </div>
      </div>
    )
  }

  if (!chatStarted) {
    return (
      <div className="start-screen">
        <div className="start-content">
          <div className="instagram-header">
            <div className="back-button">‹</div>
            <div className="chat-title">
              <div className="avatar">А</div>
              <span>❤️Абылайхан❤️</span>
            </div>
            <div className="info-button">ℹ</div>
          </div>
          <div className="start-message">
            <button onClick={startChat} className="start-button">
              Начать переписку 💌
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-container">
      <div className="chat-background"></div>
      <div className="chat-header">
        <div className="back-button">‹</div>
        <div className="chat-title">
          <div className="avatar">А</div>
          <div className="title-info">
            <span className="name">Абылайхан</span>
            <span className="status">онлайн</span>
          </div>
        </div>
        <div className="info-button">ℹ</div>
      </div>

      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender} fade-in`}>
            <div className="message-bubble">
              {msg.text}
              <span className="message-time">{formatTime(msg.time)}</span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message her fade-in">
            <div className="message-bubble typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <div className="input-wrapper">
          <span className="input-placeholder">Сообщение...</span>
        </div>
      </div>
    </div>
  )
}

export default App
