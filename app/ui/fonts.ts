import { NextFont } from 'next/dist/compiled/@next/font'
import { Inter } from 'next/font/google'
import { Lusitana } from 'next/font/google'

export const inter: NextFont = Inter({ subsets: ['latin'] })
export const lusitana: NextFont = Inter({ 
    weight: ['400', '700'],
    subsets: ['latin'] }
)