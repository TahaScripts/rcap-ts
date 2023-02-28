// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export type FormData = {
  fname: string,
  lname: string,
  email: string,
  org: string
}

export type NavLink = {
  url: string,
  label: string,
}

export type NextImage = {
  desktop: string,
  desktop_blur: string,
  mobile: string,
  mobile_blur: string,
}

export type HeaderCopy = {
  img: NextImage,
  h1_1: string,
  h1_2: string,
  h2: string,
  btn1: string,
  btn1_fn: () => void;
  btn2: string,
  btn2_fn: () => void;
}

export type ClientDimensions = {
  height: number,
  width: number
}