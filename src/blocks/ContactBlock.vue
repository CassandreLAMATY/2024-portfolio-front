<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

const object: Ref<string> = ref('info');
</script>

<template>
    <section class="contact-container">
        <div class="contact">
            <div class="contact-top">
                <h2 class="title">Wanna get in touch ?</h2>
                <p class="info">You can contact me either by texting me on my social medias or by mail !</p>
                <div class="mail-container">
                    <span class="mail"><span>contact</span>@lamatycassandre.me</span>
                    <button class="mail-copy" aria-label="copy"><font-awesome-icon :icon="['fas', 'copy']" /></button>
                </div>
            </div>

            <form class="contact-form" action="">
                <h3 class="contact-form--title">Or you can use this nice form !</h3>
                <p class="contact-form--info">
                    <span>*</span> you’ll receive a confirmation by mail if you choose this option to make sure that I
                    received everything 🤗
                </p>

                <div class="form-content">
                    <div class="form-content--group">
                        <div class="form-container" id="name-container">
                            <div class="form-title--container">
                                <label class="form-title" for="name">Who are you ?</label>
                                <span class="form-subtitle">
                                    <span>*</span> you can type your pseudo if you’re not comfortable sharing your
                                    name</span
                                >
                            </div>

                            <input class="form-input" type="text" name="name" id="name" placeholder="John Doe 🥸" />

                            <div class="validation">
                                <span class="error">Are you trying to hurt me ? SQL injection detected</span>
                            </div>
                        </div>

                        <div class="form-container" id="mail-container">
                            <div class="form-title--container">
                                <label class="form-title" for="mail">Type your e-mail here...</label>
                            </div>
                            <input
                                class="form-input"
                                type="email"
                                name="mail"
                                id="mail"
                                placeholder="john.doe@gmail.com"
                            />
                            <div class="validation">
                                <span class="error">Are you trying to hurt me ? SQL injection detected</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-content--group">
                        <div class="form-container" id="object-container">
                            <div class="form-title--container">
                                <label class="form-title" for="object">What do you want to talk about&nbsp;?</label>
                            </div>
                            <div class="form-select--container">
                                <div class="form-select--shadow"></div>
                                <select class="form-select" name="object" id="object" v-model="object">
                                    <option value="info">I would like some information</option>
                                    <option value="work">Let’s work together !</option>
                                    <option value="other">Something else</option>
                                </select>
                            </div>
                        </div>

                        <div class="object-container_other" v-if="object === 'other'">
                            <font-awesome-icon :icon="['fas', 'arrow-down']" class="object-arrow" />

                            <div class="form-title--container">
                                <span class="form-subtitle">(type your custom object here)</span>
                            </div>
                            <input
                                class="form-input"
                                type="text"
                                name="object_other"
                                id="object_other"
                                placeholder="Snails"
                            />
                            <div class="validation">
                                <span class="error">Are you trying to hurt me ? SQL injection detected</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-content--group">
                        <div class="form-container" id="message-container">
                            <div class="form-title--container">
                                <label class="form-title" for="message">Your message</label>
                            </div>
                            <div class="message-area--container">
                                <div class="message-shadow"></div>
                                <textarea
                                    class="message"
                                    name="message"
                                    id="message"
                                    placeholder="I like snails 🐌"
                                ></textarea>
                            </div>
                            <div class="validation">
                                <span class="error">Your message should be at least 3 chars long </span>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>

<style>
@import url('@/assets/stylesheets/css/contact.css');
</style>
