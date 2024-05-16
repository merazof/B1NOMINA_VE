<template>
    <div class="info-fondo">
        <div class="info-box">
            <span>El sistema de nómina más simple, rápido y moderno</span>
            <p>Calcula, procesa y automatizar tu nómina desde un mismo lugar y en tan solo unos minutos.</p>
            <div>
                <LinkButton URL="https://www.youtube.com" text="Ver Video" />
            </div>
        </div>
    </div>
</template>

<script scoped>
import LinkButton from '@/components/botones/Link-button.vue'

export default {
    name: "Fondo-Login",
    components: {
        LinkButton,
    }
}

</script>

<style scope>
.info-fondo {
    height: 100%;
    width: 85%;
    background: linear-gradient(
        35deg,
        rgb(0,46,153) 8%,
        rgb(67,65,129) 25%,
        rgb(151,54,77) 62%,
        rgb(212,46,39) 88%
    );


    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 900px;

    padding: 0px 48px;
}

.info-fondo .info-box {
    width: 100%;
    height: fit-content;
    background: none;
    max-width: 460px;
}

.info-box > span {

    font-weight: 700;
    font-size: 40px;
    letter-spacing: 0;
    line-height: normal;
    color: aliceblue;
}

.info-box > p {
    font-weight: 500;
    color: #FFFFFF;
    font-size: 20px;
    letter-spacing: 0;
    line-height: normal;
    font-family: "Poppins-Bold",Helvetica;
    max-width: 512px;
}

</style>