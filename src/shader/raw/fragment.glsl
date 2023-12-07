precision mediump float;
varying vec2 vUv;
//2D采样器 采样纹理
uniform sampler2D uTexture;
void main(){
    // vec3 baseColor=vec3(vUv,1.);
    // gl_FragColor=vec4(baseColor,1);
    vec4 textureColor=texture2D(uTexture,vUv);
    gl_FragColor=textureColor;
}