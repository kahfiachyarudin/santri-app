import React from 'react'
import { Button, buttonVariants } from "./components/ui/button"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


function App() {
  return (
    <div>
      <p className='text-3xl font-bold text-red-500'>Hello</p>
      <Button variant='secondary'>Halo</Button>
      <Button variant='outline'>Halo</Button>
      <Button variant='ghost'>Halo</Button>
      <Button variant='destructive'>Halo</Button>
      <Button>Halo</Button>
      <hr />
      <Button size='xs'>Halo</Button>
      <Button size='sm'>Halo</Button>
      <Button size='md'>Halo</Button>
      <Button size='lg'>Halo</Button>
      <Button size='xl'>Halo</Button>
      <hr />
      <Field>
        <FieldLabel>Username</FieldLabel>
        <Input placeholder='Enter your username' />
        <FieldDescription>
          This is a description for the input field.
        </FieldDescription>
      </Field>
    </div>
  )
}

export default App