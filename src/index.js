fetch('http://localhost:3000/quotes?_embed=likes')
.then(res=>res.json())
.then(data=>data.forEach(quotee=>renderOneQuote(quotee))
  
)

function renderOneQuote(quotee){
  let card=document.createElement('li')
  card.className='quote-card'
  card.innerHTML= `
<blockquote class="blockquote">
        <p class="mb-0">${quotee.quote}.</p>
        <footer class="blockquote-footer">${quotee.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>0</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>`
      document.querySelector('#quote-list').appendChild(card)
      card.querySelector('.btn-success').addEventListener('click',()=>{
        card.likes+=1
        addLikes(quotee.id)
      })
      card.querySelector('.btn-danger').addEventListener('click',()=>
{card.remove()
deleteQuote(quotee.id)
})
}

const form=document.querySelector('#new-quote-form')

form.addEventListener('submit', handleSubmit )



function addQuote(quotee){
fetch(' http://localhost:3000/quotes',{
method:'POST',
headers:{
  'Content-Type':'application/json'
},
body:JSON.stringify(quotee)


})
.then(res=>res.json())
.then(quotee=>console.log(quotee))
}


function handleSubmit(e){
  e.preventDefault()
  let quoteeObject={
   quote:e.target.quote.value,
   author:e.target.author.value
   
  }
  addQuote(quoteeObject)
  addLikes(quoteeObject)
}

function deleteQuote(id){
fetch(`http://localhost:3000/quotes/${id}`,{
  method:'DELETE',
  headers:{
    'Content-Type':'application/json'
  },
})
.then(res=>res.json())
.then(quotee=>console.log(quotee))
}

function addLikes(quoteeObject){
  fetch(`http://localhost:3000/likes`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(
      {quoteeId:id},
      quoteeObject
    )
  })
  .then(res=>res.json())
  .then(quotee=>console.log(quotee))
  }
