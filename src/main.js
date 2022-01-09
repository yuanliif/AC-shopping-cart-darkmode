import './all.scss'
const cardLists = document.querySelectorAll('.cart-list li')
const steps = document.querySelectorAll('.stepper-container li')
const formParts = document.querySelectorAll('form .part')
let step = 0
const stepBtnGroup = document.querySelector('.step-btn-group')
const preBtn = document.querySelector('.forward')
const nextBtn = document.querySelector('.next')
// 服飾數目增減
cardLists.forEach(cardList => {
  cardList.addEventListener('click', function changeItemNumber(event) {
    if (event.target.tagName !== 'BUTTON') return
    let numberBox = event.target.closest(".button-wrapper").children[1]
    let number = Number(numberBox.textContent)
    if (event.target.matches('.plus')) {
      number += 1
    } else if (event.target.matches('.minus')) {
      number -= 1
      if (number <= 0) {
        number = 0
      }
    }
    numberBox.innerHTML = number
  })
})

function BtnClicked(event) {
  event.preventDefault()
  const nowStep = steps[step]
  if (event.target.matches('.next') || event.target.matches('.next p') ||
  event.target.matches('.next img')) {
    if (step < 2) {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('done')
    nextStep.classList.add('active')
    formParts[step].setAttribute('style', 'display:none')
    formParts[step + 1].removeAttribute('style')
    step += 1
    } else {
      // 避免 nextStep 出現 null
      step = 2
    }


  } else if (event.target.matches('.forward') || event.target.matches('.forward p') ||event.target.matches('.forward img')) {
    const preStep = steps[step - 1]
    nowStep.classList.remove('active')
    preStep.classList.remove('done')
    preStep.classList.add('active')
    formParts[step-1].removeAttribute('style')
    formParts[step].setAttribute('style', 'display:none')
    step -= 1
  }
  setBtnDisplay()
}

function setBtnDisplay() {
  (step === 0) ? preBtn.setAttribute('style', 'display:none') :
  preBtn.removeAttribute('style');
  (step === 2) ? nextBtn.textContent =
    "確認下單" : nextBtn.innerHTML = `${"下一步"}<img src="./image/arrow_right@2x.png" alt="" style="margin-left: 13.5px">`
}

stepBtnGroup.addEventListener('click', BtnClicked)

// dark-mode
const darkToggleIcon = document.querySelector('#dark-toggle-icon')

function handleDarkToggle(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}



darkToggleIcon.addEventListener('click', handleDarkToggle)
