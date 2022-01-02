class Launcher{
    constructor(x, y, w, h, angle){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = angle;
        this.launcher_image = loadImage("assets/rocketLauncher.png");
        this.launcher_base = loadImage("assets/rocketBase.png");
    }

    display(){
        if(keyIsDown(RIGHT_ARROW) && this.angle<270){
            this.angle += 1;
        }
        if(keyIsDown(LEFT_ARROW) && this.angle>190){
            this.angle -= 1;
        }

        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.launcher_image, 0, 0, this.w, this.h);
        pop();
        image(this.launcher_base, 70, height/1.52, 200, 200);
        noFill();
    }
}