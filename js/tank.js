class Tank{
    constructor(x, y, w, h){
        this.w = w;
        this.h = h;
        this.isDestroyed = false;
        this.body = Bodies.rectangle(x, y, w, h);
        this.img = loadImage("assets/tank.png");
        World.add(world, this.body);
    }

    remove(index){
        this.isDestroyed = true;
        this.img = loadImage("assets/broken_tank.png");
        setTimeout(() => {
            Matter.World.remove(world, tanks[index].body);
            delete tanks[index];
        }, 1000);
    }

    display(){
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        imageMode(CENTER);
        image(this.img, 0, 0, this.w, this.h);
        pop();
    }
}