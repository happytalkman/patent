import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { KinematicState } from '../../types';

interface RoboticArmCanvasProps {
  kinematicState: KinematicState;
  showBoundaries: boolean;
  highlightConflict: boolean;
}

export const RoboticArmCanvas: React.FC<RoboticArmCanvasProps> = ({
  kinematicState,
  showBoundaries,
  highlightConflict,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 500;
    const height = mountRef.current.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070d18);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(4, 3, 5);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0x00f2ff, 0x1e293b);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f2ff, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 2, 20);
    pointLight.position.set(-3, 4, -2);
    scene.add(pointLight);

    // Robotic Arm Hierarchical Assembly
    // 1. Base
    const baseGeo = new THREE.CylinderGeometry(0.6, 0.7, 0.3, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.15;
    scene.add(baseMesh);

    // 2. Shoulder Joint (Rotates around Y)
    const shoulderGroup = new THREE.Group();
    shoulderGroup.position.y = 0.3;
    scene.add(shoulderGroup);

    const shoulderJointGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const cyanMat = new THREE.MeshStandardMaterial({ 
      color: highlightConflict ? 0xf43f5e : 0x00f2ff, 
      emissive: highlightConflict ? 0x990022 : 0x004455, 
      metalness: 0.9, 
      roughness: 0.1 
    });
    const shoulderJointMesh = new THREE.Mesh(shoulderJointGeo, cyanMat);
    shoulderGroup.add(shoulderJointMesh);

    // 3. Upper Arm Link
    const upperArmGeo = new THREE.CylinderGeometry(0.2, 0.2, 1.4, 16);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.6, roughness: 0.3 });
    const upperArmMesh = new THREE.Mesh(upperArmGeo, armMat);
    upperArmMesh.position.y = 0.7;
    shoulderGroup.add(upperArmMesh);

    // 4. Elbow Joint (Rotates around Z)
    const elbowGroup = new THREE.Group();
    elbowGroup.position.y = 1.4;
    shoulderGroup.add(elbowGroup);

    const elbowJointMesh = new THREE.Mesh(shoulderJointGeo, cyanMat);
    elbowJointMesh.scale.set(0.8, 0.8, 0.8);
    elbowGroup.add(elbowJointMesh);

    // 5. Forearm Link
    const forearmGeo = new THREE.CylinderGeometry(0.16, 0.16, 1.2, 16);
    const forearmMesh = new THREE.Mesh(forearmGeo, armMat);
    forearmMesh.position.y = 0.6;
    elbowGroup.add(forearmMesh);

    // 6. Wrist & Gripper
    const wristGroup = new THREE.Group();
    wristGroup.position.y = 1.2;
    elbowGroup.add(wristGroup);

    const wristMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.3), cyanMat);
    wristGroup.add(wristMesh);

    // 2-Finger Gripper
    const fingerMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.8 });
    const fingerLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.08), fingerMat);
    fingerLeft.position.set(0.12, 0.2, 0);
    const fingerRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.35, 0.08), fingerMat);
    fingerRight.position.set(-0.12, 0.2, 0);
    wristGroup.add(fingerLeft, fingerRight);

    // Holographic Competitor Boundary Envelope (Tesla / Boston Dynamics Patent Zones)
    const boundaryGeo = new THREE.BoxGeometry(1.8, 2.5, 1.8);
    const boundaryMat = new THREE.MeshBasicMaterial({
      color: highlightConflict ? 0xf43f5e : 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: showBoundaries ? 0.35 : 0.0
    });
    const boundaryMesh = new THREE.Mesh(boundaryGeo, boundaryMat);
    boundaryMesh.position.set(0.5, 1.5, 0.2);
    scene.add(boundaryMesh);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Apply kinematics
      shoulderGroup.rotation.y = (kinematicState.joint1Angle * Math.PI) / 180 + Math.sin(elapsedTime * 0.5) * 0.05;
      elbowGroup.rotation.z = (kinematicState.joint2Angle * Math.PI) / 180;
      wristGroup.rotation.x = (kinematicState.joint3Angle * Math.PI) / 180;

      // Subtle slow scene rotation
      camera.position.x = 4.5 * Math.cos(elapsedTime * 0.1);
      camera.position.z = 4.5 * Math.sin(elapsedTime * 0.1);
      camera.lookAt(0, 1.2, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [kinematicState, showBoundaries, highlightConflict]);

  return <div ref={mountRef} className="w-full h-full min-h-[380px] rounded-2xl overflow-hidden relative" />;
};