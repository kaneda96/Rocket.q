import Modal from './modal.js'

const modal = Modal()

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button')

const uncheckButton = document.querySelectorAll('.actions a.uncheck')
const checkButtons = document.querySelectorAll('.actions a.check')
const deleteButton = document.querySelectorAll('.actions a.delete')

checkButtons.forEach(button => {
  button.addEventListener('click', event => handleActionClick(event, true))
})

deleteButton.forEach(button => {
  button.addEventListener('click', event => handleActionClick(event, false))
})

function handleActionClick(event, check) {
  event.preventDefault()

  const roomId = document.querySelector('#room-id').dataset.id
  const slug = check ? 'check' : 'delete'
  const questionId = event.target.dataset.id

  const form = document.querySelector('.modal form')

  form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)

  modalTitle.innerHTML = check
    ? 'Marcar como lida?'
    : 'Deseja excluir a pergunta?'

  modalDescription.innerHTML = check
    ? 'Tem certeza que deseja marcar como lida está mensagem?'
    : 'Tem certeza que deseja excluir essa pertgunta?'

  modalButton.innerHTML = check ? 'Marcar como lida!' : 'Sim, excluir!'
  !check
    ? modalButton.classList.add('red')
    : modalButton.classList.remove('red')

  modal.open()
}

const cancelButton = document.querySelector(
  '.modal-wrapper .modal .buttons .cancel'
)

cancelButton.addEventListener('click', e => {
  modal.close()
})
