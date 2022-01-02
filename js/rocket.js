class Rocket{
    constructor(x, y, w, h, rAngle){
        var options = {
            isStatic: true
        };
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x, y, this.w, this.h, options);
        this.image = loadImage("assets/rocket.png");
        this.rAngle = rAngle;
        this.velocity = 0;
        World.add(world, this.body);
    }

    shoot(rAngle){
        rAngle += 90;
        this.velocity = p5.Vector.fromAngle(rAngle * (3.14 / 180));
        
        this.velocity.mult(0.5);

        Matter.Body.setVelocity(this.body, {
            x: this.velocity.x * (180 / 3.14),
            y: this.velocity.y * (180 / 3.14)
        });

        Matter.Body.setStatic(this.body, false);
    }

    display(){
        var tmpAngle;
        if(this.body.velocity.y === 0){
            tmpAngle = this.rAngle + 90;
        }
        else{
            tmpAngle = Math.atan(this.body.velocity.y / this.body.velocity.x) * (180 / 3.14);
        }

        Matter.Body.setAngle(this.body, tmpAngle);

        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.w, this.h);
        pop();
    }

    remove(index){
        this.isRemoved = true;
        Matter.World.remove(world, this.body);
        delete rockets[index];
    }
}