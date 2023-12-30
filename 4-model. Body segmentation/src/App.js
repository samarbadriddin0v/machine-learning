import { useRef, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as bodyPix from '@tensorflow-models/body-pix'
import Webcam from 'react-webcam'
import './App.css'

const App = () => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const runBodysegment = async () => {
    const net = await bodyPix.load()
    setInterval(() => {
      detect(net)
    }, 100)
  }

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // get video properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      // set video width & height
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // set canvas height & width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      const person = await net.segmentPersonParts(video)
      console.log(person)

      const coloredPartImage = bodyPix.toColoredPartMask(person)
      const opacity = 0.7
      const flipHorizontal = false
      const maskBlurAmount = 0
      const canvas = canvasRef.current

      bodyPix.drawMask(
        canvas,
        video,
        coloredPartImage,
        opacity,
        maskBlurAmount,
        flipHorizontal
      )
    }
  }

  useEffect(() => {
    runBodysegment()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam className='webcam' ref={webcamRef} />
        <canvas className='canvas' ref={canvasRef} />
      </header>
    </div>
  )
}
export default App
