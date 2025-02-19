const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("liquidCanvas") });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2, 2);
const uniforms = {
    time: { value: 1.0 }
};

const fragmentShader = `
    uniform float time;
    void main() {
        vec2 uv = gl_FragCoord.xy / vec2(1920.0, 1080.0);
        float wave = sin(uv.x * 10.0 + time) * 0.1;
        float intensity = sin(uv.y * 10.0 + wave + time) * 0.5 + 0.5;
        gl_FragColor = vec4(vec3(intensity), 1.0);
    }
`;

const material = new THREE.ShaderMaterial({
    uniforms,
    fragmentShader
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 1;

function animate() {
    requestAnimationFrame(animate);
    uniforms.time.value += 0.02;
    renderer.render(scene, camera);
}

animate();
