////
precision mediump float;
//定义顶点着色器参数
attribute vec3 position;
//传入投射矩阵
uniform mat4 projectionMatrix;
//传入视图矩阵
uniform mat4 viewMatrix;
//传入模型矩阵
uniform mat4 modelMatrix;
//定义位置参数
attribute vec2 uv;
//uv传递到片元着色器
varying vec2 vUv;
//接收着色器材质传递的时间参数
uniform float uTime;
////
void main(){
    vec4 modelPosition=modelMatrix*vec4(position,1.);
    vUv=uv;
    //modelPosition.x+=1.0
    modelPosition.z=sin((modelPosition.x+uTime)*10.)*.05;
    modelPosition.z+=sin((modelPosition.y+uTime)*10.)*.05;
    gl_Position=projectionMatrix*viewMatrix*modelPosition;
}