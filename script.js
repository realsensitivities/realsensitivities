// Setting up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creating a plane for the liquid effect
const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0 }
    },
    vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            vec3 pos = position;
            pos.z += sin(pos.x * 2.0 + time) * 0.1;
            pos.z += sin(pos.y * 3.0 + time) * 0.1;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        void main() {
            gl_FragColor = vec4(vUv.x, vUv.y, 0.3, 1.0);
        }
    `,
    wireframe: false
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// Camera positioning
camera.position.z = 5;

// Animation function
function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.02;
    renderer.render(scene, camera);
}

// Responsive design
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animate();
