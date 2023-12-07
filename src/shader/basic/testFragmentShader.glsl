//在顶点着色器中，我们将风高程存储在一个变量中
void main()
{
    // ...
    
    float elevation=sin(modelPosition.x*uFrequency.x-uTime)*.1;
    elevation+=sin(modelPosition.y*uFrequency.y-uTime)*.1;
    
    modelPosition.z+=elevation;
    
    // ...
}
//变量将提升发送到片段
// ...
varying float vElevation;

void main()
{
    // ...
    
    vElevation=elevation;
}

// ..检索片段着色器中的变量.
varying float vElevation;

void main()
{
    vec4 textureColor=texture2D(uTexture,vUv);
    textureColor.rgb*=vElevation*2.+.5;
    gl_FragColor=textureColor;
}