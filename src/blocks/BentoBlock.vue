<template>
    <section class="bento-container">
        <div class="welcome">
            <h3 class="welcome-overline">Welcome to my</h3>
            <div class="welcome-title--container">
                <h2 class="welcome-title">Portfolio</h2>
                <font-awesome-icon :icon="['fas', 'sparkle']" id="spark01" />
                <font-awesome-icon :icon="['fas', 'sparkle']" id="spark02" />
                <font-awesome-icon :icon="['fas', 'sparkle']" id="spark03" />
            </div>
            <div class="welcome-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
        <div class="bento">
            <h2>What would you like to see first ?</h2>
            <div class="bento-grid">
                <div class="bento-card" id="artworks">
                    <div class="bento-title--container">
                        <h2>Artworks</h2>
                        <div class="bento-subtitles--container">
                            <h3>Illustration</h3>
                            <h3>Charadesign</h3>
                            <h3>Pixel art</h3>
                        </div>
                    </div>
                </div>
                <div class="bento-card" id="audiovisual">
                    <div class="bento-title--container">
                        <div class="bento-subtitles--container">
                            <h3>Video</h3>
                            <h3>Photography</h3>
                        </div>
                        <h2>Artworks</h2>
                    </div>
                </div>
                <div class="bento-card" id="uiux">
                    <div class="bento-title--container">
                        <h2>UI / UX</h2>
                    </div>
                </div>
                <div class="bento-card" id="design">
                    <div class="bento-title--container">
                        <h2>Graphic design</h2>
                    </div>
                </div>
                <div class="bento-card" id="dev">
                    <div class="bento-card--bg">
                        <p>
                            MoO MoO MoO MoO MoO MoO MoO MoO MOO moO MoO MoO MoO MoO MoO moO MoO MoO MoO MoO moO MoO MoO MoO MoO moO MoO MoO MoO MoO MoO MoO MoO
                            MoO MoO moO MoO MoO MoO MoO mOo mOo mOo mOo mOo MOo moo moO moO moO moO Moo moO MOO mOo MoO moO MOo moo mOo MOo MOo MOo Moo MoO MoO 
                            MoO MoO MoO MoO MoO Moo Moo MoO MoO MoO Moo MMM mOo mOo mOo MoO MoO MoO MoO Moo moO Moo MOO moO moO MOo mOo mOo MOo moo moO moO MoO 
                            MoO MoO MoO MoO MoO MoO MoO Moo MMM MMM Moo MoO MoO MoO Moo MMM MOo MOo MOo Moo MOo MOo MOo MOo MOo MOo MOo MOo Moo mOo MoO Moo MOo
                        </p>
                    </div>
                    <div class="bento-title--container">
                        <h2>(Web) Development</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style>
@import url('@/assets/stylesheets/css/bento.css');
</style>