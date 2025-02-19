[7:22 pm, 19/2/2025] Dᴇᴇᴇᴘᴊᴏᴛ 🤍: <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RealSensitivities</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <canvas id="liquidCanvas"></canvas>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
[7:24 pm, 19/2/2025] Dᴇᴇᴇᴘᴊᴏᴛ 🤍: const scene = new THREE.Scene();
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
