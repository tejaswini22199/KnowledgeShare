function init(){
var canvas=document.getElementById('mycanvas');
w=canvas.width=900;
h=canvas.height=650;
pen=canvas.getContext('2d');
cs=66;
game_over=false;
score=0;

food=getfood();
snake={
len:5,
cells:[],
color:"blue",
direction:"right",


createsnake:function(){
for(var i=this.len;i>0;i--){
this.cells.push({x:i,y:0});
}
},

drawsnake:function(){
for(var i=0;i<this.cells.length;i++){
pen.fillStyle = this.color;
pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
}
},
updatesnake:function(){
console.log("Update Snake");
var hdx=this.cells[0].x;
var hdy=this.cells[0].y;
console.log(hdx+" "+hdy+" "+food.x+" "+food.y);
if(hdx==food.x&&hdy==food.y){
console.log("Food Eaten....................");
score++;
food=getfood();
}
else{
this.cells.pop();
}
var X,Y;
if(this.direction=="right"){
 X=hdx+1;
Y=hdy;
}
else if(this.direction=="left"){
 X=hdx-1;
Y=hdy;
}
else if(this.direction=="down"){
 X=hdx;
Y=hdy+1;
}
else{
 X=hdx;
Y=hdy-1;
}
this.cells.unshift({x:X,y:Y});

var lastx=Math.round(w/cs);
var lasty=Math.round(h/cs);
if(this.cells[0].x<0||this.cells[0].y<0||this.cells[0].x>lastx||this.cells[0].y>lasty){
 game_over=true;
}
}
};
snake.createsnake();
function keypressed(e){
if(e.key=="ArrowRight"){
snake.direction="right";
}
else if(e.key=="ArrowLeft"){
snake.direction="left";
}
else if(e.key=="ArrowDown"){
snake.direction="down";
}
else{
snake.direction="up";
}
console.log(snake.direction);
}
document.addEventListener('keydown',keypressed);
}

function draw(){
pen.clearRect(0,0,w,h);
snake.drawsnake();

pen.fillStyle=food.color;
pen.fillRect(food.x*cs,food.y*cs,cs,cs);
console.log(score);
}
function update(){

snake.updatesnake();
}
function getfood(){
var foodx=Math.round((Math.random()*(w-cs)/cs));
var foody=Math.round((Math.random()*(h-cs)/cs));

var food={
x:foodx,
y:foody,
color:"red",
}
return food;
}
function gameloop(){
if(game_over==true){
console.log("Score"+":"+score);
clearInterval(f);
alert("Score"+" :"+score+"    "+"Game Over");
return;
}
	draw();
	update();
}

init();

var f = setInterval(gameloop,100);
