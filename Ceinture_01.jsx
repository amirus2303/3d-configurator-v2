/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 ./public/ceinture_01/ceinture_01.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/ceinture_01.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.ceinture.geometry} material={nodes.ceinture.material} position={[-0.006, 0.049, 0.004]} />
      <mesh geometry={nodes.boucle.geometry} material={nodes.boucle.material} position={[-0.062, 0.031, 0.004]} />
    </group>
  )
}

useGLTF.preload('/ceinture_01.glb')
