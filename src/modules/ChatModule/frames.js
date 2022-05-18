var frameEl_array = document.getElementsByClassName("frame");
var frame_array = [{ "image": "" }, { "image": "" }, { "image": "" }, { "image": "" }, { "image": "" }]
function build_frames() {
    var frame_count = 0;
    for (let frameEl of frameEl_array) {
        var frame_imageEL = document.createElement('a-image');
        frameEl.appendChild(frame_imageEL);
        frame_imageEL.setAttribute('src', frame_array[frame_count].image);
        frame_imageEL.setAttribute("width", 0);
        frame_imageEL.setAttribute("height", 0);
        frame_imageEL.setAttribute('position', { x: 0, y: 0, z: 0.01 });
        frame_count++;
    }
}
function start_frames(){
    build_frames();
}