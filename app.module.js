

import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from "./node_modules/three/examples/jsm/controls/OrbitControls.js";

let init = () => {

    
    let canvas = document.createElement('canvas');
    canvas.setAttribute("id", "render");

    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 2;

    let renderer = document.getElementById("container");
    renderer.appendChild(canvas);

    renderer = new THREE.WebGLRenderer({canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const geometry = new THREE.BoxGeometry();

    const materials = [...Array(6).keys()].map(x => new THREE.MeshBasicMaterial( { color: 0xffffff, map: new THREE.TextureLoader().load( `textures/${x + 1}.png` ) } ));

    const cube = new THREE.Mesh( geometry, [materials[0], materials[5], materials[2], materials[3], materials[4], materials[1]] );

    scene.add( cube );

    renderer.render( scene, camera );
    // const controls = new OrbitControls( camera, canvas );
    // controls.update();

    // const axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper );

    let i = 0, randomAxis, randomDirection , stopBuffer = true, stop = true; 
    function animate() {
        // controls.update();
        i += 1

        if ((i % 10) === 0) {
            randomAxis = Math.floor(Math.random() + 1/2);
            randomDirection = Math.floor(Math.random() + 1/2);
            i = 0;
            if (stopBuffer) {
                stop = true;
            }
        }
        
        // cube.rotation.x = 100 * i;
        if (randomAxis) {
            cube.rotation.x += Math.PI/20 * (randomDirection ? 1 : -1);
            // axesHelper.rotation.x += Math.PI/20 * (randomDirection ? 1 : -1);
        } else {
            cube.rotation.y += Math.PI/20
            // axesHelper.rotation.y += Math.PI/20 * (randomDirection ? 1 : -1);
        }
        cube.rotation.z += Math.PI/20
        // axesHelper.rotation.z += Math.PI/20

        renderer.render( scene, camera );

        if (!stop) {requestAnimationFrame(animate)};
    };

    function rollDice() {
        stopBuffer = false;
        stop = false;
        animate();
    }

    function stopDice() {
        stopBuffer = true;
    }

    document.getElementById("roll").addEventListener("click", () => {
        if (stop) {
            rollDice();
        } else {
            setTimeout(stopDice, 3000);
        }
    })
}

export{init};