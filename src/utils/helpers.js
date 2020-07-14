export function formatDate (timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
  }
  
  export function formatQuestion (question, author, authedUser, parentQuestion) {
    const { id, likes, replies, text, timestamp } = question
    const { name, avatarURL } = author
  
    return {
      name,
      id,
      timestamp,
      text,
      avatar: avatarURL,
      likes: likes.length,
      replies: replies.length,
      hasLiked: likes.includes(authedUser),
      parent: !parentQuestion ? null : {
        author: parentQuestion.author,
        id: parentQuestion.id,
      }
    }
  }