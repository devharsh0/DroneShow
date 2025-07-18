import * as THREE from 'three';
import { Formation, DronePosition } from '../types/drone';

export class DroneShow {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private drones: THREE.Mesh[] = [];
  private currentFormation: Formation | null = null;
  private isTransitioning = false;
  private animationId: number | null = null;
  private stars: THREE.Points;
  private ambientLight: THREE.AmbientLight;
  private directionalLight: THREE.DirectionalLight;

  constructor(container: HTMLElement) {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000011);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 120);
    this.camera.lookAt(0, 0, 0);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    
    // Clear any existing canvas elements
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    container.appendChild(this.renderer.domElement);

    // Lighting
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    this.directionalLight.position.set(10, 10, 10);
    this.scene.add(this.directionalLight);

    // Create starfield background
    this.stars = this.createStarField();
    this.scene.add(this.stars);

    // Initialize drones
    this.initializeDrones();

    // Start render loop
    this.animate();

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  private createStarField(): THREE.Points {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 200;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.3,
      transparent: true,
      opacity: 0.4
    });

    return new THREE.Points(starGeometry, starMaterial);
  }

  private initializeDrones(): void {
    const numDrones = 50;
    
    for (let i = 0; i < numDrones; i++) {
      const geometry = new THREE.SphereGeometry(1.5, 16, 16);
      const material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        emissive: 0x008800,
        shininess: 100
      });

      const drone = new THREE.Mesh(geometry, material);
      
      // Random initial position
      drone.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );

      this.drones.push(drone);
      this.scene.add(drone);
    }
  }

  public async transitionToFormation(formation: Formation): Promise<void> {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.currentFormation = formation;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    const startPositions = this.drones.map(drone => ({
      x: drone.position.x,
      y: drone.position.y,
      z: drone.position.z,
      color: (drone.material as THREE.MeshPhongMaterial).color.getHex()
    }));

    return new Promise((resolve) => {
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing function
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        this.drones.forEach((drone, index) => {
          const start = startPositions[index];
          const target = formation.positions[index % formation.positions.length];
          
          // Interpolate position
          drone.position.x = start.x + (target.x - start.x) * easeProgress;
          drone.position.y = start.y + (target.y - start.y) * easeProgress;
          drone.position.z = start.z + (target.z - start.z) * easeProgress;

          // Interpolate color
          if (target.color) {
            const startColor = new THREE.Color(start.color);
            const targetColor = new THREE.Color(target.color);
            const currentColor = startColor.lerp(targetColor, easeProgress);
            
            const material = drone.material as THREE.MeshPhongMaterial;
            material.color.setHex(currentColor.getHex());
            material.emissive.setHex(currentColor.getHex() * 0.1);
          }
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.isTransitioning = false;
          resolve();
        }
      };

      animate();
    });
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    // Rotate camera around the scene
    const time = Date.now() * 0.0005;
    this.camera.position.x = Math.cos(time) * 120;
    this.camera.position.z = Math.sin(time) * 120;
    this.camera.position.y = Math.sin(time * 0.5) * 30;
    this.camera.lookAt(0, 0, 0);

    // Add slight rotation to starfield
    this.stars.rotation.y += 0.00005;

    // Add subtle floating animation to drones
    this.drones.forEach((drone, index) => {
      const floatOffset = Math.sin(Date.now() * 0.001 + index * 0.1) * 0.1;
      drone.position.y += floatOffset * 0.1;
      
      // Pulsing glow effect
      const material = drone.material as THREE.MeshPhongMaterial;
      const pulse = Math.sin(Date.now() * 0.003 + index * 0.2) * 0.3 + 0.7;
      material.emissive.multiplyScalar(pulse);
    });

    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize(): void {
    const container = this.renderer.domElement.parentElement!;
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  public destroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.drones.forEach(drone => {
      this.scene.remove(drone);
      drone.geometry.dispose();
      (drone.material as THREE.Material).dispose();
    });

    this.scene.remove(this.stars);
    this.stars.geometry.dispose();
    (this.stars.material as THREE.Material).dispose();

    this.renderer.dispose();
    window.removeEventListener('resize', this.onWindowResize);
  }
}