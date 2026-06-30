'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, PresentationControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function CarScene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const filmRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.3
    if (filmRef.current) {
      filmRef.current.rotation.y += delta * 0.3
      filmRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={[0, -0.3, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.8, 2.5, 6, 12]} />
        <meshStandardMaterial color="#111" metalness={0.95} roughness={0.05} />
      </mesh>
      <mesh ref={filmRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 6, 60]} />
        <meshPhysicalMaterial
          color="#C9A84C" transparent opacity={0.6}
          roughness={0} metalness={0.5}
          emissive="#C9A84C" emissiveIntensity={0.2}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2.2, 0.005, 6, 60]} />
        <meshPhysicalMaterial color="#C9A84C" transparent opacity={0.2} emissive="#C9A84C" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

export default function BrandStoryScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
      <color attach="background" args={['#050505']} />
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 8, 5]} angle={0.3} penumbra={1} intensity={2} color="#C9A84C" castShadow />
      <spotLight position={[-5, 2, 3]} angle={0.3} penumbra={1} intensity={0.5} color="#ffffff" />
      <Suspense fallback={null}>
        <PresentationControls global rotation={[0, 0.3, 0]} polar={[-0.2, 0.2]} azimuth={[-Math.PI / 4, Math.PI / 4]} config={{ mass: 2, tension: 500 }} snap={{ mass: 4, tension: 1500 }}>
          <CarScene />
        </PresentationControls>
        <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={10} blur={2} far={4} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
