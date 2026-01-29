<template>
    <div class="art-container">
        <div class="canvas-overlay">
            <svgBg />
        </div>

        <div class="login-panel">
            <div class="panel-inner">
                <header>
                    <div class="logo-orb"></div>
                    <h1>AURORA</h1>
                    <p class="tagline">DEEP SPACE TERMINAL ACCESS</p>
                </header>

                <div class="form-group">
                    <div class="cyber-input">
                        <input type="text" placeholder="IDENTIFIER" spellcheck="false" />
                        <div class="border-glow"></div>
                    </div>
                    <div class="cyber-input">
                        <input type="password" placeholder="SECURITY KEY" />
                        <div class="border-glow"></div>
                    </div>
                    <button class="submit-btn" @click="handleLogin">
                        <span class="btn-text">INITIALIZE_SYSTEM</span>
                        <div class="btn-glimmer"></div>
                    </button>
                </div>

                <footer class="panel-footer">
                    <a href="#">RECOVER_ID</a>
                    <span class="divider"></span>
                    <a href="#">REQUEST_ACCESS</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import svgBg from './svgBg.vue'
const handleLogin = () => {
    console.log('System initializing...')
}
</script>

<style scoped lang="less">
.art-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #020617;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    perspective: 1200px;

    .login-panel {
        position: relative;
        z-index: 10;
        width: 420px;
        padding: 2px; /* 边框渐变空间 */
        border-radius: 40px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
        backdrop-filter: blur(25px);
        box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.7);
        transition: transform 0.15s ease-out;

        .panel-inner {
            padding: 60px 45px;
            background: #020617cc;
            border-radius: 38px;
        }

        header {
            margin-bottom: 50px;
            .logo-orb {
                width: 40px;
                height: 40px;
                margin: 0 auto 20px;
                background: #00f2fe;
                border-radius: 50%;
                box-shadow:
                    0 0 20px #00f2fe,
                    0 0 40px #ff00c188;
            }
            h1 {
                color: #fff;
                font-size: 2.2rem;
                letter-spacing: 14px;
                font-weight: 200;
                margin: 0;
            }
            .tagline {
                color: #64748b;
                font-size: 10px;
                letter-spacing: 3px;
                margin-top: 10px;
            }
        }

        .form-group {
            .cyber-input {
                position: relative;
                margin-bottom: 30px;
                input {
                    width: 100%;
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 12px 5px;
                    color: #fff;
                    outline: none;
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    letter-spacing: 1px;
                    transition: 0.3s;
                    &:focus + .border-glow {
                        width: 100%;
                    }
                }
                .border-glow {
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: linear-gradient(90deg, #00f2fe, #ff00c1);
                    box-shadow: 0 0 15px #00f2fe;
                    transition: 0.6s cubic-bezier(0.23, 1, 0.32, 1);
                }
            }

            .submit-btn {
                width: 100%;
                padding: 18px;
                margin-top: 20px;
                background: #fff;
                border: none;
                border-radius: 100px;
                color: #000;
                font-weight: 700;
                letter-spacing: 2px;
                cursor: pointer;
                overflow: hidden;
                position: relative;
                transition: 0.4s;
                &:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(0, 242, 254, 0.3);
                }
            }
        }

        .panel-footer {
            margin-top: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            a {
                color: #475569;
                font-size: 11px;
                text-decoration: none;
                transition: 0.3s;
                &:hover {
                    color: #00f2fe;
                }
            }
            .divider {
                width: 1px;
                height: 10px;
                background: #1e293b;
            }
        }
    }
}
</style>
