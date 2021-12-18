img = "";
statusofobjectdetection = "";
objects = [];
function preload() {
    img = loadImage("dog_cat.jpg");
}
function setup() {
    canvas = createCanvas(640, 420);
    canvas.position(290, 135);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status :  Detecting objects...";
}
function modelLoaded() {
    console.log("Model Loaded! Starting detection...");
    statusofobjectdetection = true;
    objectDetector.detect(img, gotResults);
}
function gotResults(error, results) {
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}
function draw() {
    image(img, 0, 0, 640, 420);
    if(statusofobjectdetection != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status :  Object Detected!";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}