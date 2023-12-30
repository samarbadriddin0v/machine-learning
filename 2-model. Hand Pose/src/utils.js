// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
}

// Infinity Gauntlet Style
const style = {
  0: { color: 'yellow', size: 15 },
  1: { color: 'gold', size: 6 },
  2: { color: 'green', size: 10 },
  3: { color: 'gold', size: 6 },
  4: { color: 'gold', size: 6 },
  5: { color: 'purple', size: 10 },
  6: { color: 'gold', size: 6 },
  7: { color: 'gold', size: 6 },
  8: { color: 'gold', size: 6 },
  9: { color: 'blue', size: 10 },
  10: { color: 'gold', size: 6 },
  11: { color: 'gold', size: 6 },
  12: { color: 'gold', size: 6 },
  13: { color: 'red', size: 10 },
  14: { color: 'gold', size: 6 },
  15: { color: 'gold', size: 6 },
  16: { color: 'gold', size: 6 },
  17: { color: 'orange', size: 10 },
  18: { color: 'gold', size: 6 },
  19: { color: 'gold', size: 6 },
  20: { color: 'gold', size: 6 },
}

export const drawHand = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks

      // barmoqlar uchun tsikl
      for (let i = 0; i < Object.keys(fingerJoints).length; i++) {
        let finger = Object.keys(fingerJoints)[i]
        // bog'imlar uchun tsikl
        for (let j = 0; j < fingerJoints[finger].length - 1; j++) {
          const firstJointIndex = fingerJoints[finger][j]
          const secondJointIndex = fingerJoints[finger][j + 1]

          // draw path
          ctx.beginPath()
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          )
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          )
          ctx.strokeStyle = 'aqua'
          ctx.lineWidth = 4
          ctx.stroke()
        }
      }

      for (let k = 0; k < landmarks.length; k++) {
        // find x and y points
        const x = landmarks[k][0]
        const y = landmarks[k][1]

        // start drawing
        ctx.beginPath()
        ctx.arc(x, y, style[k]['size'], 0, 3 * Math.PI)

        // set color
        ctx.fillStyle = style[k]['color']
        ctx.fill()
      }
    })
  }
}
