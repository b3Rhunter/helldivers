import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Cube = () => {
  const meshRef = useRef();
  const { scene, gl } = useThree();
  const particleCount = 500;
  const cubeSize = 500;

  useEffect(() => {
    const positions = new Float32Array(particleCount * 3);
    let i = 0;
    while(i < particleCount) {
      const x = Math.random() * cubeSize - cubeSize / 2;
      const y = Math.random() * cubeSize - cubeSize / 2;
      const z = Math.random() * cubeSize - cubeSize / 2;

      if (Math.abs(x) + Math.abs(y) + Math.abs(z) < cubeSize) {
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        i++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xdbf0df,
      size: 0.25,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false
    });

    meshRef.current = new THREE.Points(geometry, material);
    meshRef.current.rotation.x = Math.random() * 6;
    meshRef.current.rotation.y = Math.random() * 6;
    meshRef.current.rotation.z = Math.random() * 6;

    scene.add(meshRef.current);

    gl.setClearColor(0x071309); 

  }, [particleCount, scene, gl]);

  useFrame(() => {
    meshRef.current.rotation.y += 0.001;
  });

  return null;
};

export default Cube;