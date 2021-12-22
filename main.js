song="";
scorerightwrist =0;
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
    canvas= createCanvas(600,500);
    canvas.center();
     video= createCapture(VIDEO);
     video.hide();
     poseNet=ml5.poseNet(video, modelLoaded);
     poseNet.on('pose', gotPoses);
}
function draw()
{
    image(video,0,0,600,500);
    fill("#0c083b");
    stroke("#0c083b");
    if (scoreleftwrist>0.2)
    {
        circle(leftwristx, leftwristy, 20);
        innumberleftwristy=Number(leftwristy);
        remove_decimal= floor(innumberleftwristy);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML ="volume = " + volume;
        song.setVolume(volume);
    }
    if(scorerightwrist> 0.2)
    {
        circle(rightwristx,rightwristy, 20);
        if(rightwristy>0 && rightwristy<=100)
        {
            document.getElementById("speed").innerHTML="speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightwristy>100 && rightwristy<=200)
        {
            document.getElementById("speed").innerHTML="speed = 1.0x";
            song.rate(1.0);
        }
        else if(rightwristy>200 && rightwristy<=300)
        {
            document.getElementById("speed").innerHTML="speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightwristy>300 && rightwristy<=400)
        {
            document.getElementById("speed").innerHTML="speed = 2.0x";
            song.rate(2.0);
        }
        else if(rightwristy>400)
        {
            document.getElementById("speed").innerHTML="speed = 2.5x";
            song.rate(2.5);
        }
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
        scorerightwrist= results[0].pose.keypoints[10].score;
        console.log("Score LeftWrist= "+scoreleftwrist+ " Score RightWrist= "+scorerightwrist);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        console.log("RightWristx= "+rightwristx+"RightWristy ="+rightwristy);

        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        console.log("LeftWristx= "+leftwristx+"LeftWristy ="+leftwristy);
    }
}