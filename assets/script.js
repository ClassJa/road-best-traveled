const modalPopUp = document.querySelector('#label')
const modal = document.querySelector('modal-pop-up')

const submit = document.querySelector('submit-btn')

submit.addEventListener('click', showModal)


function showModal(event) {
  event.preventDefault
  if (submit.getAttribute('visibility') === 'hidden') {
    modal.setAttribute('visibility', 'visible')
  } else {
    console.log('')
    // modal.setAttribute('visibility', 'hidden')
  }
}