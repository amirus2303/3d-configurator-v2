/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 ./public/montre_01/montre_01.glb 
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/montre_01.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.ecran.geometry} material={nodes.ecran.material} position={[0.001, 0.04, 0]} />
      <mesh geometry={nodes.bouton.geometry} material={nodes.bouton.material} position={[0.001, 0.04, 0]} />
      <mesh geometry={nodes.bracelet.geometry} material={nodes.bracelet.material} position={[0.018, 0.06, 0.001]} />
    </group>
  )
}

useGLTF.preload('/montre_01.glb')
