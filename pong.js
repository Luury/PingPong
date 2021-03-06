import * as THREE from "/ThreeJs/build/three.module.js";

// Scene
const scene = new THREE.Scene();

const left = 0;
const right = 300; // default canvas size
const top = 0;
const bottom = 150; // defautl canvas size
const near = -1;
const far = 1;
const camera = new THREE.OrthographicCamera(
    left,
    right,
    top,
    bottom,
    near,
    far
);

scene.background = new THREE.Color("black");

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Textures
const loader = new THREE.TextureLoader();
const hockeyDiskTexture = loader.load(
    "ThreeJs/examples/textures/HockeyDisk.png"
);
const PlayerTexture = loader.load("ThreeJs/examples/textures/Player.png");

// Disk Object
const Size = 10;
const geometryDisk = new THREE.PlaneGeometry(Size, Size);

const materialDisk = new THREE.MeshBasicMaterial({
    transparent: true,
    map: hockeyDiskTexture,
    side: THREE.DoubleSide,
});
const hockeyDiskObject = new THREE.Mesh(geometryDisk, materialDisk);

hockeyDiskObject.position.x = right / 2;
hockeyDiskObject.position.y = bottom / 2;

//Player Object
const geometryPlayer = new THREE.PlaneGeometry(5, 30);

const materialPlayer = new THREE.MeshBasicMaterial({
    transparent: true,
    map: PlayerTexture,
    side: THREE.DoubleSide,
});
const PlayerObject = new THREE.Mesh(geometryPlayer, materialPlayer);

PlayerObject.position.y = bottom / 2;
PlayerObject.position.x = 2;

//Add Objects to Scene
scene.add(PlayerObject);
scene.add(hockeyDiskObject);

// Vars
var movementX = 0.5;
var movementY = 0.5;
var player1Points = 0;
var player2Points = 0;


// Animate Function
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    document.getElementById("player1Points").innerHTML = player1Points;
    document.getElementById("player2Points").innerHTML = player2Points;

    hockeyDiskObject.position.x += movementX;
    hockeyDiskObject.position.y += movementY;

    const hockeyDiskObjectBox = new THREE.Box3().setFromObject(hockeyDiskObject)

    if (hockeyDiskObjectBox.max.x >= 300) {
        movementX = -movementX;
        player1Points++
    }

    if (hockeyDiskObjectBox.min.x <= 0) {
        movementX = -movementX;
        player2Points++
    }

    if (hockeyDiskObjectBox.max.y >= 150) {
        movementY = -movementY;
    }

    if (hockeyDiskObjectBox.min.y <= 0) {
        movementY = -movementY;
    }
}

//Start
animate();