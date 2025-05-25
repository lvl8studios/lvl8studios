"use client"

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, Preload, useGLTF } from '@react-three/drei'

const Eight = ({ isMobile }: { isMobile: boolean }) => {
    const eight = useGLTF('./eight/scene.gltf')

    return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
            <mesh position={[0, isMobile ? -1.25 : -2, 0]}>
                <ambientLight intensity={1.5} />
                <directionalLight
                    position={[0, 10, 5]}
                    intensity={2}
                    castShadow
                />
                <directionalLight
                    position={[-10, 0, -5]}
                    intensity={1.5}
                />
                <directionalLight
                    position={[10, 0, -5]}
                    intensity={1.5}
                />
                <hemisphereLight
                    intensity={2}
                    groundColor="black"
                    color="#fff"
                />
                <primitive
                    object={eight.scene}
                    scale={isMobile ? 6.0 : 8.0}
                    position={[0, isMobile ? 0.5 : 1.5, 0]}
                    rotation={[-0.01, -0.2, -0.1]}
                />
            </mesh>
        </Float>
    )
}

export function EightCanvas() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 500px)")
        setIsMobile(mediaQuery.matches)

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches)
        }

        mediaQuery.addEventListener("change", handleMediaQueryChange)
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange)
        }
    }, [])

    return (
        <div className="h-[300px] sm:h-[400px] w-full">
            <Canvas
                frameloop="always"
                shadows
                camera={{ position: [20, isMobile ? 5 : 3, 5], fov: 25 }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <Suspense fallback={null}>
                    <OrbitControls
                        enableZoom={false}
                        maxPolarAngle={Math.PI / 2}
                        minPolarAngle={Math.PI / 2}
                        target={[0, 0, 0]}
                        enablePan={false}
                    />
                    <group position={[0, 0, 0]}>
                        <Eight isMobile={isMobile} />
                    </group>
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}
