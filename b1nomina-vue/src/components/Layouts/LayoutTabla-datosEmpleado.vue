<template>
    <div class="contend">
        
        <div class="elementos">

            <div class="boton-position">
                <slot name="boton1"></slot>
            </div>
            <h3><slot name="titulo1"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-1"></slot></span>
                    <h4><slot name="text-1"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-2"></slot></span>
                    <h4><slot name="text-2"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-3"></slot></span>
                    <h4><slot name="text-3"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-4"></slot></span>
                    <h4><slot name="text-4"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton2"></slot>
            </div>
            <h3><slot name="titulo2"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-5"></slot></span>
                    <h4><slot name="text-5"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-6"></slot></span>
                    <h4><slot name="text-6"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-7"></slot></span>
                    <h4><slot name="text-7"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-8"></slot></span>
                    <h4><slot name="text-8"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton3"></slot>
            </div>
            <h3><slot name="titulo3"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-9"></slot></span>
                    <h4><slot name="text-9"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-10"></slot></span>
                    <h4><slot name="text-10"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-11"></slot></span>
                    <h4><slot name="text-11"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-12"></slot></span>
                    <h4><slot name="text-12"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton4"></slot>
            </div>
            <h3><slot name="titulo4"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-13"></slot></span>
                    <h4><slot name="text-13"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-14"></slot></span>
                    <h4><slot name="text-14"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-15"></slot></span>
                    <h4><slot name="text-15"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-16"></slot></span>
                    <h4><slot name="text-16"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton5"></slot>
            </div>
            <h3><slot name="titulo5"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-17"></slot></span>
                    <h4><slot name="text-17"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-18"></slot></span>
                    <h4><slot name="text-18"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-19"></slot></span>
                    <h4><slot name="text-19"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-20"></slot></span>
                    <h4><slot name="text-20"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton6"></slot>
            </div>
            <h3><slot name="titulo6"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-21"></slot></span>
                    <h4><slot name="text-21"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-22"></slot></span>
                    <h4><slot name="text-22"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-23"></slot></span>
                    <h4><slot name="text-23"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-24"></slot></span>
                    <h4><slot name="text-24"></slot></h4>
                </div>
            </div>

            <div class="boton-position">
                <slot name="boton7"></slot>
            </div>
            <h3><slot name="titulo7"></slot></h3>
            <div class="row-elementos">
                <div class="box">
                    <span><slot name="st-25"></slot></span>
                    <h4><slot name="text-25"></slot></h4>
                </div>           
                <div class="box">
                    <span><slot name="st-26"></slot></span>
                    <h4><slot name="text-26"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-27"></slot></span>
                    <h4><slot name="text-27"></slot></h4>
                </div>
                <div class="box">
                    <span><slot name="st-28"></slot></span>
                    <h4><slot name="text-28"></slot></h4>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* Contenedor principal del componente, aplicando estilos flexbox para organizar sus hijos en una fila en orden inverso. */
div.contend {
    display: flex;
    flex-direction: row-reverse;
    padding-left: 24px;
    box-sizing: border-box;
}

/* Contenedor para posicionar un botón personalizado, utilizando flexbox para alinear el botón a la derecha. */
div.boton-position {
    display: flex;
    width: 100%;
    justify-content: end;
    box-sizing: border-box;
}

/* Sección de elementos, organizada en una columna con flexbox, asegurando un espacio entre los elementos. */
div.elementos {
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
}

/* Fila de elementos, utilizando CSS Grid para organizar los elementos en una cuadrícula con 4 columnas de igual tamaño. */
div.row-elementos {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr; 
    gap: 12px;
    box-sizing: border-box;
    justify-content: space-between;
}

/* Cada "box" dentro de la fila de elementos, configurado para crecer y ocupar el espacio disponible. */
div.row-elementos > div.box {
    width: max-content;
    flex-grow: 1;
}

/* Estilos para el texto dentro de cada "box", especificando color, tamaño de fuente, familia de fuente, peso de fuente, altura de línea y ajuste de palabras. */
div.row-elementos > div.box > span {
    color: #363855;
    font-size: 14px;
    font-family: Poppins;
    font-weight: 400;
    line-height: 24px;
    word-wrap: break-word;
}

/* Estilos para los títulos h3, especificando color, tamaño de fuente, peso de fuente, altura de línea y ajuste de palabras. */
h3 {
    color: #1A2771;
    font-size: 18px;
    font-weight: 600;
    line-height: 40px;
    word-wrap: break-word;
    margin: 0;
}

/* Estilos para los subtítulos h4 dentro de cada "box", especificando margen, color, tamaño de fuente, peso de fuente y ajuste de palabras. */
div.row-elementos > div.box > h4 {
    margin: 0;
    color: #000842;
    font-size: 20px;
    font-weight: 400;
    word-wrap: break-word;
}
</style>
