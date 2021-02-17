

import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";
//Don't forget to install three.js. 
//npm install three

let init = () => {

    //First of all, we need a canvas to work with three.js. So, let's create it.
    let canvas = document.createElement('canvas');
    canvas.setAttribute("id", "render");

    //THREE.Scene() is your three.js scene. Right now, it exists, but it doesn't display anything yet.
    const scene = new THREE.Scene();
    
    /*
    Then we set up a camera in the scene. We need to fill 4 parameters : FOV, aspect ration, near and far. 
    To better understand the viewing frustrum : https://en.wikipedia.org/wiki/Viewing_frustum.
    I'm also changing the camera z position to not be inside the cube.
    */
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 2;

    /*
    The renderer is what allows you to render your three.js scene. 
    Your scene is still empty, so you are currently displaying nothing (!= not displaying).
    */
    let renderer = document.getElementById("container");
    renderer.appendChild(canvas);

    renderer = new THREE.WebGLRenderer({canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    /*
    Let's add a cube !!
    three.js has a lot of other geometry figures, but the cube is the easiest to understand (and the cutest) of all, so let's work with a cube.
    */
    const geometry = new THREE.BoxGeometry();

    /* 
    Let's add a material and a color.
    three.js has a lot of materials. Let's use the basic material and just add a color.

    You also can load texture on the cube. 
    This method load the texture on every side of the cube. You can also load a different texture on each side with THREE.CubeTextureLoader().
    */
    // const texture = new THREE.TextureLoader().load( "textures/cirno.png" );
    const loader = new THREE.CubeTextureLoader()
    loader.setPath( 'textures/' );
    const texture = loader.load( [
        '1.png',
        '2.png',
        '3.png',
        '4.png',
        '5.png',
        '6.png'
    ] );

    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: texture } );
    

    /*
    Right now, this cube doesn't really exist. It's just "instructions" to make a cube.
    Mesh is a method to craft the geometry figures. It uses lot of triangles polygon to make them.
    */
    const cube = new THREE.Mesh( geometry, material );

    /*
    Your cube exists ! But it isn't displaying anywhere...
    Let's add it to the scene to make it exist !
    */
    scene.add( cube );

    //Congratulations ! Not only your cube exists, but it's very cute ! You can be proud of yourself !!


    /*
    But, your cube isn't displaying any different than a regular 2D square right now, isn't it ?
    If you don't believe that we just made a cube, let's animate it to see other sides.
    It's pretty easy to animate this kind of figure. Don't hesitate to change the values and test the different animations.
    */
    renderer.render( scene, camera );
    const controls = new OrbitControls( camera, canvas );
    controls.update();
    cube.x = 1000;
    cube.y = 1000;
    // let i = 0;
    function animate() {
        requestAnimationFrame( animate );
        controls.update();

        // i += 0.01
        
        // cube.rotation.x = 100 * i;

        // cube.rotation.x = i;
        // cube.rotation.y = -i;
        
        // cube.rotation.x = Math.sin(i) /2;
        // cube.rotation.y = Math.cos(i) /2;

        renderer.render( scene, camera );
    };

    animate();
    

}

export{init};