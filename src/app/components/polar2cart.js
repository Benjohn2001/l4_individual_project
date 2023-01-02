export function polar2cart(centX, centY, radius, deg){
    const radians = (Math.PI*(deg-90))/180
    return{
        x: centX+radius*Math.cos(radians),
        y: centY+radius*Math.sin(radians)
    }
}