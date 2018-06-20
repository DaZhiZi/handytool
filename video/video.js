const getVideo = () => {
    const video = e('video')
    navigator.mediaDevices.getUserMedia({video: true, audio: false}).then((media) => {
        log(media)
        video.srcObject = media
        video.play()
    }).catch((err) => alert('please allow the webcam to operate it'))
}

const alphaBtn = () => {
    const input =  e('.rgb')
    input.addEventListener('change', (event) => {
        log(input.value, typeof input.value)
        let data =  Number(input.value)
        return data
    })
}

const rgbSplit = (pixels) => {
    for (var i = 0; i < pixels.data.length; i+= 4) {
        pixels.data[i - 150] = pixels.data[i + 0]
        pixels.data[i + 500] = pixels.data[i + 1]
        pixels.data[i - 550] = pixels.data[i + 2]
    }

    return pixels
}

const drawCanvas = () => {
    const video = e('video')
    const canvas = e('canvas')
    const ctx = canvas.getContext('2d')

    video.addEventListener('canplay', () => {
        const w = video.videoWidth
        const h = video.videoHeight
        canvas.width = w
        canvas.height = h
        log(w, h)
        let alpha = alphaBtn()


        setInterval( async () => {
            ctx.drawImage(video, 0, 0, w, h)

            let pixels = ctx.getImageData(0, 0, w, h)

            pixels = rgbSplit(pixels)

            ctx.globalAlpha = alpha

            log(ctx.globalAlpha)


            ctx.putImageData(pixels, 0, 0)


        }, 30)
    })
}



const __main = () => {
    getVideo()
    drawCanvas()
}

__main()
