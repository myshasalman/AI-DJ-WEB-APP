song="";
scoreleftwrist =0;
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
function preload()
{
    song= loadSound("music.mp3");
}
function setup()
{
    canvas= createCanvas(600,400);
    canvas.center();
     video= createCapture(VIDEO);
     video.hide();
     poseNet=ml5.poseNet(video, modelLoaded);
     poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video,0,0,600,400);
    fill("#0c083b");
    stroke("#0c083b");
    if (scoreleftwrist>0.2)
    {
        circle(leftwristx, leftwristy, 20);
        innumberleftwristy=Number(leftwristy);
        remove_decimal= floor(innumberleftwristy);
        volume = remove_decimal/400;
        document.getElementById("volume").innerHTML ="volume = " + volume;
        song.setVolume(volume);
    }
}
function playsound()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded()
{
    console.log("posenet is Initalized");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftwrist= results[0].pose.keypoints[9].score;

        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("RightWristx= "+rightwristx+"RightWristy ="+rightwristy);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("LeftWristx= "+leftwristx+"LeftWristy ="+leftwristy);
    }
}