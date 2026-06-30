'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

function Layers() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {[
        { y: -1.5, color: '#111',    metalness: 0.9, roughness: 0.1, opacity: 1,    trans: false, transmission: 0 },
        { y: -0.7, color: '#ffffff', metalness: 0,   roughness: 0,   opacity: 0.12, trans: true,  transmission: 0.9 },
        { y: 0.1,  color: '#C9A84C', metalness: 0.5, roughness: 0.2, opacity: 0.4,  trans: true,  transmission: 0.4 },
        { y: 0.9,  color: '#aaaaff', metalness: 0,   roughness: 0,   opacity: 0.1,  trans: true,  transmission: 0.95 },
        { y: 1.7,  color: '#ffffff', metalness: 0,   roughness: 0,   opacity: 0.08, trans: true,  transmission: 0.98 },
      ].map((l, i) => (
        <mesh key={i} position={[0, l.y, 0]}>
          <planeGeometry args={[4.5, 3]} />
          <meshPhysicalMaterial
            color={l.color} metalness={l.metalness} roughness={l.roughness}
            transparent={l.trans} opacity={l.opacity} transmission={l.transmission}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

export default function ProductScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
      <color attach="background" args={['#0a0a0a']} />
      <ambientLight intensity={0.4} />
      <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={2} castShadow color="#C9A84C" />
      <spotLight position={[-5, -5, 5]} angle={0.3} penumbra={1} intensity={0.5} color="#ffffff" />
      <Suspense fallback={null}>
        <Layers />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  )
}
