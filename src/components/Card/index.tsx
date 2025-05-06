import { PropsWithChildren } from 'react'

const Card = ({ children }: PropsWithChildren) => {

    return (
        <div className='bg-white rounded-md py-5 px-10' >{children}</div>
    )
}

export default Card