//componente global, aqueles que usamos muitas vezes em diferentes telas
import { ComponentProps, ReactNode } from "react";
import {tv, VariantProps} from 'tailwind-variants'

//a lib tailwind-variants é usada para que possamos lidar com componentes globais
//que possuem pequenas alterações de estilo
//a declaração padrão é a que fazemos logo abaixo
//base é o estilo padrão para todas as variações
//nós que decidimos o nome que iremos dar as diferenças de estilo
//nesse caso foi usado variants, me parece mais fácil no geral manter esse
//dentro do objeto variants, criamos as possíveis variações, como só temos duas
//nessa aplicação criamos somente essas duas
//por fim temos o default variants, que decide a variante usada quando
//nada for passado no nosso className
//essas variantes são recebidas por meio de props
//como podemos ter diversas variantes, extendemos nossas props mais uma vez
//colocamos nas props o VariantProps<typeof buttonVariants>, o que vai 
//permitir as props reconhecerem automaticamente quantas variantes tiverem ali!
const buttonVariants = tv({
    base: 'rounded-lg px-5 font-medium flex justify-center items-center gap-2',
    variants: {
        variant: {
            primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
            secondary: 'bg-zinc-800 text-zinc-200  hover:bg-zinc-700'
        },
        size: {
            default: 'py-2',
            full: 'w-full h-11'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'default'
    }
})
//ReactNode é o tipo de dado que permite passar textos, ícones e etc para o HTML
//o children é basicamente tudo que fica dentro das tags Button na nossa aplicação
//o ComponentProps<'button'> é o que permite o botão receber todas as funcionalidades de botão do html
//isso é feito para que não seja necessário colocar função por função nas props
//como sabemos que são MUITAS interações com botões HTML, usamos o rest operator no nosso componente
//situações onde o estilo de um componente global é alterado são chamados de variantes
interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{
    children: ReactNode
}

export function Button({children, variant, size, ...props}: ButtonProps){
    return(
        //como estamos passando JS no HTML usamos {variant}
        <button {...props} className={buttonVariants({variant, size})}>
        {children}
        </button>
    )
}