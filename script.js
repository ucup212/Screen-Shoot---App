const screenshotBtn = document.querySelector("#src-btn"),
screenshotPreview = document.querySelector(".src-preview"),
closeBtn = screenshotPreview.querySelector("#close-btn");

const captureScreen = async () => {
    try {
        // meminta ijin digunakannya suatu media input untuk merekam tab saat ini
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
        const video = document.createElement("video");

        video.addEventListener("loadedmetadata", () =>{
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            
            //menangkap video width dan height sebagai canvas width dan heigth
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            video.play();//jalankan video jika tidak ingin hasil capture blank or black
            //tangkap gambar dari capture video stream
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            stream.getVideoTracks()[0].stop();//untuk menghentikan video track dari track pertama stream variable
            // document.body.appendChild(canvas);

            //menangkap data dari canvas url sebagai screenshot preview src/sumber
            screenshotPreview.querySelector("img").src = canvas.toDataURL();
            screenshotPreview.classList.add("show");
        });
        video.srcObject = stream; //menangkap data stream dan ditampung di video sebagai obejek
        // console.log("🚀 ~ file: script.js:6 ~ captureScreen ~ stream:", stream)
        
    } catch (error) { //jika gambar gagal dimuat dengan masalah apapun itu akan di catch disini
        // console.log("🚀 ~ file: script.js:7 ~ captureScreen ~ error:", error)
        alert("Gagal untuk mengambil Screenshot");
        
    }
}

closeBtn.addEventListener("click", () => screenshotPreview.classList.toggle(""))
screenshotBtn.addEventListener("click", captureScreen);