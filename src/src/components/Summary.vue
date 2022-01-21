<template>
  <div class="summary-box" id="summary-id">
    <div class="summary-header">
      <p style="margin: 0px">Summary</p>
      <a href="summary.pdf" target="_blank" style="padding-top: 20px">
        <img alt="downloadSummary" src="../assets/download.svg" />
      </a>
    </div>
    <div class="all-column">
      <ul class="left-column">
        <div>
          <p class="box-naming">Образование:</p>
          <li class="box-list">
            <p>сентябрь 2014 - февраль 2020</p>
            <p>
              Воронежский государственный технический университет специалист
            </p>
            <p>Кафедра радиоэлектронных систем управления и комплексов</p>
          </li>

          <p class="box-naming">Дополнительное образование:</p>
          <li class="box-list">
            <p>сентябрь 2014 - февраль 2020</p>
            <p>Слёрм</p>
            <p>Вечерняя школа по Kubernetes</p>
          </li>

          <p class="box-naming">Опыт работы:</p>
          <li class="box-list">
            <p>
              март 2019 - настоящее время
              <a class="org-name" href="https://fusionpos.ru/">FusionPOS</a>
            </p>
            <p class="description">Разработчик</p>
            <p class="description">
              Разработка новых и поддержка старых кросплатформенных мобильных
              приложений на Qt (с использованием Object-C и Java).
              Проектирование и создание API на Yii2.
            </p>
          </li>
          <li class="box-list">
            <p>
              сентябрь 2020 - январь 2021
              <a class="org-name" href="https://www.coffeebon.ru/">
                CoffeeBon
              </a>
            </p>
            <p class="description">Разработчик</p>
            <p class="description">Доработка мобильного приложения на Qt.</p>
          </li>
        </div>
      </ul>
      <ul class="right-column">
        <p class="box-naming">Скиллы:</p>
        <div class="skill-flex">
          <p>NodeJS/Typescript</p>
          <div class="skill-box">
            <div class="skill-fill" style="width: 70%"></div>
            <div class="skill-lvl">Знаю нюансы</div>
          </div>
        </div>
        <div class="skill-flex">
          <p>SQL/ORM</p>
          <div class="skill-box">
            <div class="skill-fill" style="width: 50%"></div>
            <div class="skill-lvl">Умею писать сложные запросы</div>
          </div>
        </div>
        <div class="skill-flex">
          <p>GIT</p>
          <div class="skill-box">
            <div class="skill-fill" style="width: 70%"></div>
            <div class="skill-lvl">Могу работать из консоли</div>
          </div>
        </div>
        <div class="skill-flex">
          <p>Figma</p>
          <div class="skill-box">
            <div class="skill-fill" style="width: 40%"></div>
            <div class="skill-lvl">Обладаю базовыми навыками</div>
          </div>
        </div>
        <p class="box-naming">Технический стэк:</p>
        <li class="box-list">NodeJS (ExpressJS), TypeScript, TypeORM, Jest</li>
        <li class="box-list">MySQL, PostgreSQL, MongoDB, Redis</li>
        <li class="box-list">RabbitMQ, Kafka</li>
        <li class="box-list">
          Linux, Docker, k8s, Helm, CI/CD, GitLab, DevOps, GitOps
        </li>
        <li class="box-list">Qt, qml, C++, Andoid (Java), iOS (Object-C)</li>
        <li class="box-list">PHP, Yii2</li>
        <li class="box-list">Vue3, HTML, CSS</li>

        <p class="box-naming">Достижения:</p>
        <li class="box-list">Внедрил CI/CD для Android приложений</li>
        <li class="box-list">
          Внедрил мониторинг и логирование в backend-часть
        </li>
        <li class="box-list">
          Внедрил различные сервисы Firebase в мобильное приложение на Qt
        </li>
        <li class="box-list">Умею работать с JNI в Qt</li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {},
})
export default class Summary extends Vue {}
</script>

<style scoped>
.summary-box {
  min-height: 100vh;
  position: static;
  padding: 0 8.5%;
}

.summary-header {
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-block-end: 0;
  height: 48px;
}

.summary-header a {
  padding-top: 10px;
  height: fit-content;
  cursor: pointer;
}

.summary-header a img {
  width: 32px;
  height: 32px;
}

@media (max-device-width: 736px) {
  .summary-header {
    font-size: 24px;
    margin-top: 30px;
  }
  .summary-header p {
    margin: 0;
  }
}

.all-column {
  margin-top: 20px;
  margin-bottom: 147px;
  display: flex;
  justify-content: space-between;
}

@media (max-device-width: 736px) {
  .all-column {
    flex-direction: column;
  }
  .left-column {
    margin: 0;
    padding: 0;
  }
  .right-column {
    margin: 0;
    padding: 0;
  }
  .all-column {
    margin: 0;
  }
}

.left-column {
  list-style-position: outside;
}

.box-naming {
  padding: 0;
  margin-top: 32px;
  margin-bottom: 12px;
  font-size: 24px;
  max-height: max-content;
}

@media (max-device-width: 736px) {
  .box-naming {
    margin-top: 30px;
    margin-bottom: 0;
  }
}

.box-list {
  max-width: 420px;
  font-size: 17px;
  margin-top: 20px;
  margin-left: 40px;
  word-break: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}

.box-list p {
  margin: 7px 0;
}

.org-name {
  margin-left: 7px;
  font-size: 20px;
  font-weight: 400;
  font-style: oblique;
  color: #ffffff;
}

.org-name:hover {
  text-decoration: underline;
  color: #515075;
}

.description {
  padding-left: 14px;
  text-align: justify;
  word-break: break-all;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

.right-column p {
  word-break: keep-all;
  padding-right: 5px;
}

.skill-flex {
  display: flex;
  align-items: center;
  text-align: right;
  width: fit-content;
  margin-bottom: 0px;
}

.skill-flex p {
  text-align: right;
  width: 120px;
}

@media (max-device-width: 736px) {
  .skill-flex {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
  }
  .skill-flex p {
    width: fit-content;
    padding-left: 10px;
    margin: 26px 0 3px 0;
  }
}

.skill-box {
  width: 20vw;
  height: 8px;
  border-radius: 4px;
  background: #c5c5c5;
  margin-left: 7px;
}

@media (max-device-width: 736px) {
  .skill-box {
    width: 250px;
  }
}

.skill-fill {
  height: 8px;
  border-radius: 4px 0 0 4px;
  background: #515075;
}

.skill-lvl {
  font-size: 17px;
  width: inherit;
}

@media (max-device-width: 736px) {
  .skill-lvl {
    font-size: 14px;
  }
}
</style>