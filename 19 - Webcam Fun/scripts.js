const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({ video:true, audio:false }) //this will access users camera
    // this returns a PROMISE so we need to call a .then on the promise
    .then(localMediaStream => {
        console.log(localMediaStream);
        //now we need to set users webcam data as a source for our html video element
        //we cannot do it just like video.src = localMediaStream 
        //because src needs to be a url, and localMediaStream is currently an object
        //use window.URL.createObjectURL method on localMediaStream to convert it to url form object
        //video.src = window.URL.createObjectURL(localMediaStream);
        video.srcObject = localMediaStream;
        video.play(); //needs to be called for video to actually update live
    })
    .catch(err => {
        console.error(`OH NO!!!`, err);
      });
}

getVideo(); //when running the function is will ask us if we want to use the camera
