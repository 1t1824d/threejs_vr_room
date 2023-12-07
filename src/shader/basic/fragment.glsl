varying vec2 vUv;
void main(){
    vec3 baseColor=vec3(.41,1.,.5);
    float clarity=(vUv.y*.5)+.5;
    gl_FragColor=vec4(baseColor*clarity,1);
}