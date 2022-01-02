class Ground{
    constructor(x, y, w, h){
        let options = {
            isStatic: true
        };

        this.body = Bodies.rectangle(x, y, w, h, options);
        this.w = w;
        this.h = h;
        this.image = loadImage("assets/sand.jpg");
        World.add(world, this.body);
    }

    display(){
        let pos = this.body.position;
        push();
        imageMode(CENTER);
        stroke(0);
        image(this.image, pos.x, pos.y, this.w, this.h);
        pop();
    }
}