import { useRef, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'
import Webcam from 'react-webcam'
import './App.css'
import { drawKeypoints, drawSkeleton } from './utils'

const App = () => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution: { width: 680, height: 480 },
    })
    setInterval(() => {
      detect(net)
    }, 10)
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

      // set video width and height
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // make detection
      const pose = await net.estimateSinglePose(video)

      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef)
    }
  }

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext('2d')
    canvas.current.width = videoWidth
    canvas.current.height = videoHeight

    drawKeypoints(pose['keypoints'], 0.5, ctx)
    drawSkeleton(pose['keypoints'], 0.5, ctx)
  }

  useEffect(() => {
    runPosenet()

    // eslint-disable-next-line
  }, [])

  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam ref={webcamRef} className='webcam' />
        <canvas ref={canvasRef} className='canvas' />
      </header>
    </div>
  )
}
export default App
