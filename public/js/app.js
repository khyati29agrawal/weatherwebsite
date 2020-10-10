
const messageOne = document.querySelector('#messageone')
const search = document.querySelector('input')
const weatherform = document.querySelector('form')
weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if(data.error)
                console.log(data.error)
            else
                console.log(data.forecaste)
        })
    })
})