import * as THREE from 'three';
window.THREE = THREE
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from "tween.js";
/* 
**
*/
//加载管理器
// let event = {}
// event.onLoad = () => {
// }
// event.onProgress = (url, num, total) => {
//     console.log(`url,num,total`, url, num, total, `${Math.round(num / total * 100)}%`);
// }
// event.onError = () => {
// }
// let textureManage = new THREE.LoadingManager(
//     event.onLoad,
//     event.onProgress,
//     event.onError
// )
/* 
**
*/
let ContainerIDDiv = document.querySelector("#ContainerID")
let width = ContainerIDDiv.getBoundingClientRect().width
let height = ContainerIDDiv.getBoundingClientRect().height
console.log(`width,height`, width, height);
/* 
**
*/
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);
let camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 100);
camera.position.z = 0.01;
scene.add(camera);
/* 
**
*/
const textures = getTexturesFromAtlasFile(require('../assets/textures/sun_temple_stripe.jpg'), 6);
const materials = [];
for ( let i = 0; i < 6; i ++ ) {
    materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] } ) );
}
const skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
skyBox.geometry.scale( 1, 1, - 1 );
scene.add( skyBox );
function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {
    const textures = [];
    for ( let i = 0; i < tilesNum; i ++ ) {
        textures[ i ] = new THREE.Texture();
    }
    new THREE.ImageLoader()
        .load( atlasImgUrl, ( image ) => {
            let canvas, context;
            const tileWidth = image.height;
            for ( let i = 0; i < textures.length; i ++ ) {
                canvas = document.createElement( 'canvas' );
                context = canvas.getContext( '2d' );
                canvas.height = tileWidth;
                canvas.width = tileWidth;
                context.drawImage( image, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
                textures[ i ].colorSpace = THREE.SRGBColorSpace;
                textures[ i ].image = canvas;
                textures[ i ].needsUpdate = true;
            }
        } );
    return textures;
}

/* 
**
*/
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true
renderer.setSize(width, height)  //设置渲染的尺寸大小
ContainerIDDiv.appendChild(renderer.domElement);// 将webgl渲染的内容添加到body
/* 
**
*/
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;
controls.rotateSpeed = - 0.25;
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
/* 
**
*/
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera)
    controls.update()
}
render();
/* 
**
*/
window.addEventListener("resize", () => {
    width = ContainerIDDiv.getBoundingClientRect().width
    height = ContainerIDDiv.getBoundingClientRect().height
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)

})

/* 
**
*/

window.addEventListener("dblclick", () => {
    let fullscreen = document.fullscreenElement
    if (!fullscreen) {
        renderer.domElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})
