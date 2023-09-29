const edit = document.querySelectorAll('.edit')
const detail = document.querySelectorAll('.detail')

edit.forEach((element)=>{
  element.addEventListener('click',(event)=>{
    event.preventDefault();
    window.location.href = `/editor/${event.target.value}/edit`
  })
})

detail.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = `/editor/${event.target.value}/detail`
  })
})
