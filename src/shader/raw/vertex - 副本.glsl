varying vec2 vUv;
uniform float time;

// 噪波
float N(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float smoothNoise(vec2 ip){
    vec2 lv=fract(ip);
    vec2 id=floor(ip);
    
    lv=lv*lv*(3.-2.*lv);
    
    float bl=N(id);
    float br=N(id+vec2(1,0));
    float b=mix(bl,br,lv.x);
    
    float tl=N(id+vec2(0,1));
    float tr=N(id+vec2(1,1));
    float t=mix(tl,tr,lv.x);
    
    return mix(b,t,lv.y);
}

void main(){
    
    vUv=uv;
    float t=time*2.;
    
    // 顶点位置
    
    vec4 mvPosition=vec4(position,1.);
    #ifdef USE_INSTANCING
    mvPosition=instanceMatrix*mvPosition;
    #endif
    
    // 移动
    
    float noise=smoothNoise(mvPosition.xz*.5+vec2(0.,t));
    noise=pow(noise*.5+.5,2.)*2.;
    
    // 叶片顶部晃动力度.
    float dispPower=1.-cos(uv.y*3.1416*.5);
    
    float displacement=noise*(.3*dispPower);
    mvPosition.z-=displacement;
    
    //
    
    vec4 modelViewPosition=modelViewMatrix*mvPosition;
    gl_Position=projectionMatrix*modelViewPosition;
    
}