import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TestbedFacility } from '../../types';

interface IsometricMapCanvasProps {
  facilities: TestbedFacility[];
  selectedFacilityId: string;
  onSelectFacility: (id: string) => void;
  is3DMode: boolean;
}

export const IsometricMapCanvas: React.FC<IsometricMapCanvasProps> = ({
  facilities,
  selectedFacilityId,
  onSelectFacility,
  is3DMode,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 600;
    const height = mountRef.current.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070d18);

    // Isometric Camera setup
    const aspect = width / height;
    const d = 6;
    const camera = is3DMode
      ? new THREE.PerspectiveCamera(40, aspect, 0.1, 1000)
      : new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 0.1, 1000);

    if (is3DMode) {
      camera.position.set(10, 10, 10);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(10, 12, 10);
      camera.lookAt(0, 0, 0);
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Neon Isometric Grid Plane
    const gridHelper = new THREE.GridHelper(16, 24, 0x00f2ff, 0x1e293b);
    scene.add(gridHelper);

    // Ambient & Directional Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const sunLight = new THREE.DirectionalLight(0x00f2ff, 1.8);
    sunLight.position.set(12, 20, 10);
    scene.add(sunLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 1.5, 20);
    amberLight.position.set(-6, 5, -6);
    scene.add(amberLight);

    // Render Stylized Nanobanana-2 3D Buildings
    const buildingMeshes: { mesh: THREE.Mesh; id: string }[] = [];

    facilities.forEach((fac) => {
      const isSelected = fac.id === selectedFacilityId;

      // Building Geometry & Material
      const bHeight = fac.category === 'Patent Office' ? 2.5 : fac.category === 'Extreme Arena' ? 1.8 : 1.4;
      const geo = new THREE.BoxGeometry(1.2, bHeight, 1.2);
      const mat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0x00f2ff : fac.category === 'Extreme Arena' ? 0x0566d9 : 0x1e293b,
        emissive: isSelected ? 0x004455 : 0x000000,
        metalness: 0.8,
        roughness: 0.2
      });

      const buildingMesh = new THREE.Mesh(geo, mat);
      buildingMesh.position.set(fac.coordinates[0], bHeight / 2, fac.coordinates[2]);
      scene.add(buildingMesh);
      buildingMeshes.push({ mesh: buildingMesh, id: fac.id });

      // Holographic Floating Pulse Beacon
      const beaconGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: fac.openSlots > 0 ? 0x10b981 : 0xf59e0b,
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.position.set(fac.coordinates[0], bHeight + 0.5, fac.coordinates[2]);
      scene.add(beaconMesh);

      // Pulse Ring
      const ringGeo = new THREE.RingGeometry(0.2, 0.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f2ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(fac.coordinates[0], bHeight + 0.3, fac.coordinates[2]);
      scene.add(ringMesh);
    });

    // Raycasting for interactive click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(buildingMeshes.map(b => b.mesh));

      if (intersects.length > 0) {
        const hit = buildingMeshes.find(b => b.mesh === intersects[0].object);
        if (hit) {
          onSelectFacility(hit.id);
        }
      }
    };

    mountRef.current.addEventListener('click', handleClick);

    // Render loop with slight floating motion
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (is3DMode) {
        camera.position.x = 10 * Math.cos(t * 0.05);
        camera.position.z = 10 * Math.sin(t * 0.05);
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      if (is3DMode) {
        (camera as THREE.PerspectiveCamera).aspect = w / h;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeEventListener('click', handleClick);
        if (renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [facilities, selectedFacilityId, is3DMode, onSelectFacility]);

  return <div ref={mountRef} className="w-full h-full min-h-[420px] rounded-2xl overflow-hidden relative cursor-pointer" />;
};