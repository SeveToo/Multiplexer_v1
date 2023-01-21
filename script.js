const inputs = document.querySelectorAll('.input__box')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const drawMultiplexer = (arrInputsX, inputsY) => {
  // set stroke color
  ctx.strokeStyle = 'white'

  // variables
  const x = 230
  const y = 150
  const width = 130
  const height = 200
  const inputs = arrInputsX.length

  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw the multiplexer
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + width, y)
  ctx.lineTo(x + width, y + height)
  ctx.lineTo(x, y + height)
  ctx.lineTo(x, y)
  ctx.stroke()
  ctx.closePath()

  //   lines in the middle
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x + width, y + height / 2)
  ctx.lineTo(x, y + height)
  ctx.stroke()
  ctx.closePath()

  // output line
  ctx.beginPath()
  ctx.moveTo(x + width, y + height / 2)
  ctx.lineTo(x + width + 50, y + height / 2)
  ctx.stroke()
  ctx.closePath()

  // bottom lines
  ctx.beginPath()
  ctx.moveTo(x + width / 2, y + height)
  ctx.lineTo(x + width / 2, y + height + 20)
  ctx.moveTo(x + width / 2 + 30, y + height)
  ctx.lineTo(x + width / 2 + 30, y + height + 20)
  ctx.moveTo(x + width / 2 - 30, y + height)
  ctx.lineTo(x + width / 2 - 30, y + height + 20)
  ctx.stroke()
  // labels
  ctx.font = '17px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText('x1', x + width / 2 - 40, y + height + 40)
  ctx.fillText('x2', x + width / 2 - 10, y + height + 40)
  ctx.fillText('x3', x + width / 2 + 20, y + height + 40)
  ctx.fillText('Y', x + width + 60, y + height / 2 + 6)

  // draw the inputs
  let inputX = x + 10
  let inputY = y + 10
  let gap = (height - 30) / inputs + 1
  let color = 'white'

  for (let i = 1; i < inputs + 1; i++) {
    ctx.beginPath()
    ctx.moveTo(x, y + i * gap)
    switch (arrInputsX[i - 1]) {
      case '0':
        color = 'red'
        ctx.lineTo(x - gap, y + i * gap)
        break
      case '1':
        color = 'green'
        ctx.lineTo(x - 2 * gap, y + i * gap)
        break
      case 'x':
        color = 'white'
        ctx.lineTo(x - 5 * gap, y + i * gap)
        break
      case '!x':
        color = 'grey'
        ctx.lineTo(x - 3 * gap, y + i * gap)
        break
      default:
        break
    }
    // color = 'white' // make one color << change this
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.closePath()

    // draw the input text
    ctx.font = '20px Arial'
    ctx.fillStyle = color
    ctx.fillText(i - 1, x + 5, y + i * gap + 5)
  }

  // draw initial input red line (0)
  if (arrInputsX.indexOf('0') !== -1) {
    ctx.beginPath()
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 1
    ctx.moveTo(x - gap, y + (arrInputsX.indexOf('0') + 1) * gap * 1)
    ctx.lineTo(x - gap, y + inputsY * 3.5 * gap)
    ctx.stroke()
    ctx.closePath()
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.moveTo(x - gap + 10, y + inputsY * 3.5 * gap)
    ctx.lineTo(x - gap - 10, y + inputsY * 3.5 * gap)
    ctx.stroke()
    ctx.closePath()
  }

  //   draw initial input green line (1)
  if (arrInputsX.indexOf('1') !== -1) {
    ctx.beginPath()
    ctx.strokeStyle = 'green'
    ctx.lineWidth = 1
    ctx.moveTo(x - 2 * gap, y + (arrInputsX.indexOf('1') + 1) * gap * 1)
    ctx.lineTo(x - 2 * gap, y + inputsY * 3.7 * gap - 3)
    ctx.stroke()
    ctx.closePath()
    // draw circle in the end of the line
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.arc(x - 2 * gap, y + inputsY * 3.7 * gap, 3, 0, 2 * Math.PI)
    ctx.stroke()
    // text for the input
    ctx.font = '20px Arial'
    ctx.fillStyle = 'green'
    ctx.fillText(`'1'`, x - 3 * gap + 12, y + inputsY * 4.1 * gap)
    ctx.closePath()
  }

  //   draw initial input white line (x)
  if (arrInputsX.indexOf('x') !== -1 || arrInputsX.indexOf('!x') !== -1) {
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    if (arrInputsX.indexOf('x') !== -1) {
      ctx.moveTo(x - 5 * gap, y + (arrInputsX.lastIndexOf('x') + 1) * gap * 1)
    } else {
      ctx.moveTo(x - 5 * gap, y - 20)
    }
    ctx.lineTo(x - 5 * gap, -y + inputsY * 3.7 * gap + 3)
    ctx.stroke()
    // draw circle in the end of the line

    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.arc(x - 5 * gap, -y + inputsY * 3.7 * gap, 3, 0, 2 * Math.PI)
    ctx.stroke()
    //   text
    ctx.font = '20px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText(`x`, x - 5 * gap - 5, -y + inputsY * 3.5 * gap)
    ctx.closePath()
  }

  if (arrInputsX.indexOf('!x') !== -1) {
    // dot to negation line
    if (arrInputsX.indexOf('x') !== -1) {
      ctx.beginPath()
      ctx.lineWidth = 3
      ctx.arc(x - 5 * gap, -y + inputsY * 4.2 * gap, 1, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
    }
    // negation line
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    ctx.moveTo(x - 5 * gap, -y + inputsY * 4.2 * gap)
    ctx.lineTo(x - 4.5 * gap, -y + inputsY * 4.2 * gap)
    ctx.lineTo(x - 4.5 * gap, -y + inputsY * 4.32 * gap)
    ctx.lineTo(x - 3.7 * gap, -y + inputsY * 4.2 * gap)
    ctx.lineTo(x - 4.5 * gap, -y + inputsY * 4.08 * gap)
    ctx.lineTo(x - 4.5 * gap, -y + inputsY * 4.2 * gap)
    ctx.stroke()
    ctx.closePath()

    // dot to negation line
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.arc(x - 3.58 * gap, -y + inputsY * 4.2 * gap, 2.6, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()

    // draw not gate from x line
    ctx.beginPath()
    ctx.strokeStyle = 'grey'
    ctx.lineWidth = 1
    ctx.moveTo(x - 3 * gap, y + (arrInputsX.lastIndexOf('!x') + 1) * gap * 1)
    ctx.lineTo(x - 3 * gap, -y + inputsY * 4.2 * gap)
    ctx.lineTo(x - 3.4 * gap, -y + inputsY * 4.2 * gap)
    ctx.stroke()
  }
}

// drawMultiplexer(['1', '0', '1', 'x', 'x', '!x', 'x', '0'], 3)

let values = []
const handleUpdate = (value, index) => {
  console.log(value, index)
  values[index] = value
  console.log(values)
  drawMultiplexer(values, 3)
  // console.log(values)
}

const update = () => {
  inputs.forEach((input, i) => {
    // get input childs which are buttons
    let buttons = input.childNodes
    buttons = Array.from(buttons) // to jest tablica
    buttons = buttons.filter(button => button.nodeName === 'BUTTON')
    buttons.forEach(button => {
      if (button.classList.contains('active')) {
        handleUpdate(button.innerText, i)
      }
    })
  })
}

inputs.forEach((input, i) => {
  // get input childs which are buttons
  let buttons = input.childNodes
  buttons = Array.from(buttons) // to jest tablica
  buttons = buttons.filter(button => button.nodeName === 'BUTTON')
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      handleUpdate(button.innerText, i)
      buttons.forEach(b => {
        if (b !== button) {
          b.classList.remove('active')
        }
      })
      button.classList.add('active')
    })
  })
})

update()
