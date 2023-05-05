<template>
    <div class="page-root">
        <div class="head">
            <img src="../assets/logo.png" alt="">
        </div>
        <div class="bodyer">
            <ComponentLogin></ComponentLogin>
        </div>

    </div>
    
</template>


<script setup>
import ComponentLogin from '../components/ComponentLogin.vue'

</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}
.page-root{
    height: 100vh;
    min-height: 100vh;
    position: relative;
}
.head{
    min-height: 40%;
    /* background-color: rgb(230, 247, 255); */
    background-image: url('../assets/bk.jpeg');
    background-repeat: no-repeat;
    background-size:cover;
    background-position:  0% 40%;
    border-radius: 0 0 50% 50%/25%;
}
.head img{
    width: 100px;
}
.bodyer{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;

}

</style>