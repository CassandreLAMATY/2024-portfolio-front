<script setup lang="ts">
const version: string | undefined = import.meta.env.VITE_APP_VERSION;
const lastUpdate: string | undefined = import.meta.env.VITE_APP_LAST_UPDATE;
</script>

<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-about--container">
                <div class="footer-about">
                    <span class="about">
                        Designed in
                        <a href="https://www.figma.com/" target="_blank">Figma</a> and coded in
                        <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a>.<br />Built with
                        <a href="https://vuejs.org/" target="_blank">Vue.js</a> and
                        <a href="https://expressjs.com/" target="_blank">Express.js</a>.
                    </span>
                    <div class="footer-media--container">
                        <a href="https://www.behance.net/lamatycassandre" target="_blank" class="footer-media">
                            <button type="button" class="footer-media--btn">
                                <font-awesome-icon class="footer-media--icon" :icon="['fab', 'square-behance']" />
                                Behance
                            </button>
                        </a>
                        <a href="https://www.behance.net/lamatycassandre" target="_blank" class="footer-media">
                            <button type="button" class="footer-media--btn">
                                <font-awesome-icon class="footer-media--icon" :icon="['fab', 'linkedin']" /> Linkedin
                            </button>
                        </a>
                    </div>
                </div>
                <div class="footer-nav">
                    <ul>
                        <RouterLink to="/about" class="footer-nav--link">
                            <li>About Me</li>
                        </RouterLink>
                        <RouterLink to="/portfolio" class="footer-nav--link">
                            <li>Portfolio</li>
                        </RouterLink>
                    </ul>
                </div>
            </div>
            <div class="footer-credits--container">
                <div class="footer-credits--content">
                    <span class="footer-credits">Made with ❤️ by Cassandre Lamaty</span>
                    <hr class="footer-credits--hr" />
                    <span class="footer-credits--version">
                        <span class="version">v{{ version || '0.0' }}</span> -
                        <span class="date">{{ lastUpdate || '2003.06.04 - 00:00am' }}</span>
                    </span>
                </div>
                <span class="footer-rights">&copy; 2024 - Cassandre Lamaty. All Rights Reserved.</span>
            </div>
        </div>
    </footer>
</template>

<style>
@import url('@/assets/stylesheets/css/footer.css');
</style>
