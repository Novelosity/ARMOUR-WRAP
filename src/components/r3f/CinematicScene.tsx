'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function PPFScene() {
  const filmRef = useRef<THREE.Mesh>(null)
  const film2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (filmRef.current) {
      filmRef.current.position.y = Math.sin(t * 0.7) * 0.3 + 0.6
      filmRef.current.rotation.x = Math.sin(t * 0.4) * 0.06 - 0.3
    }
    if (film2Ref.current) {
      film2Ref.current.position.y = Math.sin(t * 0.5 + 1) * 0.2 + 1.4
    }
  })

  return (
    <group>
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={filmRef} castShadow>
        <planeGeometry args={[7, 4.5, 20, 14]} />
        <meshPhysicalMaterial
          color="#C9A84C" transparent opacity={0.25}
          transmission={0.85} roughness={0.05} thickness={0.5}
          side={THREE.DoubleSide} iridescence={1} iridescenceIOR={1.5}
        />
      </mesh>
      <mesh ref={film2Ref}>
        <planeGeometry args={[6, 4, 16, 10]} />
        <meshPhysicalMaterial
          color="#ffffff" transparent opacity={0.07}
          transmission={0.95} roughness={0} side={THREE.DoubleSide}
        />
      </mesh>
      <gridHelper args={[14, 20, '#C9A84C', '#1a1a1a']} position={[0, -1.49, 0]} />
      <Sparkles count={50} scale={8} size={2.5} speed={0.3} opacity={0.12} color="#C9A84C" />
    </group>
  )
}

export default function CinematicScene() {
  return (
    <Canvas shadows camera={{ position: [0, 2.5, 9], fov: 50 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 8, 22]} />
      <ambientLight intensity={0.1} />
      <spotLight position={[0, 12, 0]} angle={0.4} penumbra={1} intensity={3} color="#C9A84C" castShadow shadow-mapSize={[512, 512]} />
      <spotLight position={[8, 4, 4]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />
      <Suspense fallback={null}>
        <PPFScene />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}
